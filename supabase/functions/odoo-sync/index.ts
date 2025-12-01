import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const ODOO_URL = Deno.env.get("ODOO_URL")!;
const ODOO_DB = Deno.env.get("ODOO_DB")!;
const ODOO_USER = Deno.env.get("ODOO_USER")!;
const ODOO_PASSWORD = Deno.env.get("ODOO_PASSWORD")!; // This will be the API Key

serve(async (req) => {
    try {
        // 1. Parse Payload (Supabase Webhook format)
        const payload = await req.json();
        const record = payload.record; // 'record' contains the new row data

        if (!record) {
            console.error("No record found in payload:", payload);
            return new Response("No record found", { status: 400 });
        }

        console.log("New lead received:", record.id);

        // 2. Authenticate with Odoo
        const commonUrl = `${ODOO_URL}/xmlrpc/2/common`;
        const uid = await xmlRpcCall(commonUrl, "authenticate", [
            ODOO_DB,
            ODOO_USER,
            ODOO_PASSWORD,
            {},
        ]);

        if (!uid) {
            throw new Error("Odoo authentication failed. Check credentials.");
        }

        console.log("Authenticated with Odoo, UID:", uid);

        // 3. Prepare Lead Data
        const objectUrl = `${ODOO_URL}/xmlrpc/2/object`;
        const configSummary = JSON.stringify(record.configuration, null, 2);

        const leadData = {
            name: `Nouvelle config: ${record.pack_title || "Konexlab"}`,
            contact_name: "Client Web", // Placeholder until we have a name field
            description: `Configuration Details:\n${configSummary}`,
            type: "opportunity",
            priority: record.pack_title?.includes("Sécurité") ? "2" : "1",
            source_id: false, // Optional: Add a source if known
        };

        // 4. Create Lead in Odoo
        const leadId = await xmlRpcCall(objectUrl, "execute_kw", [
            ODOO_DB,
            uid,
            ODOO_PASSWORD,
            "crm.lead",
            "create",
            [leadData],
        ]);

        console.log("Lead created in Odoo, ID:", leadId);

        // 5. Update Supabase Record (Optional: Store Odoo ID)
        // We can't easily update back without a Service Key, so we skip for now.

        return new Response(JSON.stringify({ success: true, odoo_id: leadId }), {
            headers: { "Content-Type": "application/json" },
        });

    } catch (error) {
        console.error("Error processing request:", error);
        return new Response(JSON.stringify({ error: error.message }), {
            status: 500,
            headers: { "Content-Type": "application/json" },
        });
    }
});

// --- XML-RPC Helper (Fetch based) ---
async function xmlRpcCall(url: string, method: string, params: any[]) {
    const xml = `
    <methodCall>
      <methodName>${method}</methodName>
      <params>
        ${params.map(serializeParam).join("")}
      </params>
    </methodCall>
  `;

    const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "text/xml" },
        body: xml,
    });

    const text = await response.text();
    return parseXmlResponse(text);
}

function serializeParam(param: any): string {
    if (typeof param === "number") return `<param><value><int>${Math.floor(param)}</int></value></param>`;
    if (typeof param === "string") return `<param><value><string>${escapeXml(param)}</string></value></param>`;
    if (typeof param === "boolean") return `<param><value><boolean>${param ? 1 : 0}</boolean></value></param>`;
    if (Array.isArray(param)) {
        return `<param><value><array><data>${param.map((p) => serializeParam(p).replace(/<\/?param>/g, "")).join("")}</data></array></value></param>`;
    }
    if (typeof param === "object" && param !== null) {
        return `<param><value><struct>${Object.entries(param)
            .map(
                ([k, v]) =>
                    `<member><name>${k}</name><value>${serializeParam(v).replace(/<\/?param>/g, "").replace(/<\/?value>/g, "")}</value></member>`
            )
            .join("")}</struct></value></param>`;
    }
    return "";
}

function escapeXml(unsafe: string): string {
    return unsafe.replace(/[<>&'"]/g, (c) => {
        switch (c) {
            case '<': return '&lt;';
            case '>': return '&gt;';
            case '&': return '&amp;';
            case '\'': return '&apos;';
            case '"': return '&quot;';
        }
        return c;
    });
}

function parseXmlResponse(xml: string): any {
    // Robust parsing for integer (UID or ID)
    const intMatch = xml.match(/<int>(\d+)<\/int>/);
    if (intMatch) return parseInt(intMatch[1], 10);

    // Parsing for string errors or results
    const stringMatch = xml.match(/<string>(.*?)<\/string>/);
    if (stringMatch) return stringMatch[1];

    // Check for faults
    if (xml.includes("<fault>")) {
        const faultString = xml.match(/<member><name>faultString<\/name><value><string>(.*?)<\/string><\/value><\/member>/);
        if (faultString) throw new Error(`Odoo Fault: ${faultString[1]}`);
        throw new Error("Unknown Odoo Fault");
    }

    return null;
}
