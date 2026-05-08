"use client";
import { useState, useCallback } from "react";

const FIRST_NAMES = [
  "James","John","Robert","Michael","William","David","Richard","Joseph","Thomas","Charles",
  "Christopher","Daniel","Matthew","Anthony","Mark","Donald","Steven","Paul","Andrew","Joshua",
  "Mary","Patricia","Jennifer","Linda","Barbara","Elizabeth","Susan","Jessica","Sarah","Karen",
  "Lisa","Nancy","Betty","Margaret","Sandra","Ashley","Dorothy","Kimberly","Emily","Donna",
  "Michelle","Carol","Amanda","Melissa","Deborah","Stephanie","Rebecca","Sharon","Laura","Cynthia",
  "Liam","Noah","Oliver","Elijah","Lucas","Mason","Logan","Ethan","Aiden","Jackson",
];

const LAST_NAMES = [
  "Smith","Johnson","Williams","Brown","Jones","Garcia","Miller","Davis","Rodriguez","Martinez",
  "Hernandez","Lopez","Gonzalez","Wilson","Anderson","Thomas","Taylor","Moore","Jackson","Martin",
  "Lee","Perez","Thompson","White","Harris","Sanchez","Clark","Ramirez","Lewis","Robinson",
  "Walker","Young","Allen","King","Wright","Scott","Torres","Nguyen","Hill","Flores",
  "Green","Adams","Nelson","Baker","Hall","Rivera","Campbell","Mitchell","Carter","Roberts",
  "Turner","Phillips","Evans","Edwards","Collins","Stewart","Morris","Murphy","Cook","Rogers",
];

const CITIES = [
  "New York","Los Angeles","Chicago","Houston","Phoenix","Philadelphia","San Antonio","San Diego",
  "Dallas","San Jose","Austin","Jacksonville","Fort Worth","Columbus","Charlotte","Indianapolis",
  "San Francisco","Seattle","Denver","Nashville","Oklahoma City","El Paso","Portland","Las Vegas",
  "Memphis","Louisville","Baltimore","Milwaukee","Albuquerque","Tucson","Fresno","Sacramento",
  "Mesa","Omaha","Cleveland","Atlanta","Virginia Beach","Raleigh","Colorado Springs","Miami",
];

const STATES = [
  "AL","AK","AZ","AR","CA","CO","CT","DE","FL","GA","HI","ID","IL","IN","IA","KS","KY","LA",
  "ME","MD","MA","MI","MN","MS","MO","MT","NE","NV","NH","NJ","NM","NY","NC","ND","OH","OK",
  "OR","PA","RI","SC","SD","TN","TX","UT","VT","VA","WA","WV","WI","WY",
];

const STREET_NAMES = [
  "Main St","Oak Ave","Maple Dr","Cedar Ln","Pine Rd","Elm St","Washington Blvd","Park Ave",
  "Lake Dr","Hill Rd","River Rd","Forest Ave","Valley Way","Summit Dr","Sunset Blvd","Highland Ave",
  "Meadow Ln","Willow St","Birch Ct","Walnut Ave","Cherry St","Poplar Dr","Magnolia Blvd","Ash Ln",
  "Hickory Rd","Spruce Ave","Chestnut St","Mulberry Way","Dogwood Dr","Sycamore Ln",
];

const COMPANIES = [
  "Acme Corp","Globex Solutions","Initech Systems","Umbrella Technologies","Soylent Media",
  "Hooli Inc","Pied Piper","Massive Dynamic","Vandelay Industries","Sterling Cooper",
  "Initech Software","Weyland Corp","Tyrell Corporation","Oscorp Industries","Stark Enterprises",
  "Wayne Enterprises","LexCorp","Gekko & Co","Initech Digital","Axiom Industries",
  "Aperture Science","Black Mesa Research","Cyberdyne Systems","Dharma Initiative","Oceanic Airlines",
  "Praxis Solutions","Regal Analytics","Sigma Tech","Titan Corp","Union Pacific Digital",
];

const JOB_TITLES = [
  "Software Engineer","Senior Developer","Product Manager","Data Scientist","UX Designer",
  "DevOps Engineer","QA Engineer","Frontend Developer","Backend Engineer","Full Stack Developer",
  "Marketing Manager","Sales Executive","Operations Manager","HR Specialist","Financial Analyst",
  "System Administrator","Security Engineer","Cloud Architect","Database Administrator","CTO",
  "Project Manager","Business Analyst","Content Strategist","SEO Specialist","Growth Hacker",
  "Machine Learning Engineer","Site Reliability Engineer","Technical Lead","Engineering Manager","VP Engineering",
];

const DOMAINS = [
  "gmail.com","yahoo.com","outlook.com","hotmail.com","icloud.com","protonmail.com","fastmail.com",
  "zoho.com","aol.com","inbox.com","mail.com","yandex.com","tutanota.com","hey.com","pm.me",
];

const WEBSITE_DOMAINS = [
  "example.com","mysite.io","devhub.net","techblog.co","portfolio.dev","webapp.io","startupco.com",
  "digitalworks.net","codecraft.dev","buildspace.io","launchpad.co","venture.io","innovate.tech","pixelhaus.co",
];

const LOREM_SENTENCES = [
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.",
  "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum.",
  "Excepteur sint occaecat cupidatat non proident sunt in culpa.",
  "Nulla facilisi morbi tempus iaculis urna id volutpat lacus laoreet.",
  "Pellentesque habitant morbi tristique senectus et netus malesuada fames.",
  "Vestibulum ante ipsum primis in faucibus orci luctus ultrices posuere.",
  "Cras ultricies ligula sed magna dictum porta vitae turpis.",
  "Feugiat nisl pretium fusce id velit ut tortor pretium viverra.",
];

const rand = (arr: string[]) => arr[Math.floor(Math.random() * arr.length)];
const randInt = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;

function makeUUID(): string {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, c => {
    const r = Math.random() * 16 | 0;
    return (c === "x" ? r : (r & 0x3 | 0x8)).toString(16);
  });
}

function makePhone(): string {
  const area = randInt(200, 999);
  const prefix = randInt(200, 999);
  const line = randInt(1000, 9999);
  return `(${area}) ${prefix}-${line}`;
}

function makeIP(): string {
  return `${randInt(1,254)}.${randInt(0,255)}.${randInt(0,255)}.${randInt(1,254)}`;
}

function makeDOB(): string {
  const year = randInt(1955, 2003);
  const month = String(randInt(1, 12)).padStart(2, "0");
  const day = String(randInt(1, 28)).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function makeCreditCard(): string {
  const last4 = randInt(1000, 9999);
  return `XXXX-XXXX-XXXX-${last4}`;
}

function makeUsername(first: string, last: string): string {
  const styles = [
    () => `${first.toLowerCase()}${last.toLowerCase()}${randInt(1, 99)}`,
    () => `${first.toLowerCase()}_${last.toLowerCase()}`,
    () => `${first.toLowerCase()}${randInt(100, 999)}`,
    () => `${last.toLowerCase()}${first[0].toLowerCase()}${randInt(10, 99)}`,
  ];
  return styles[randInt(0, styles.length - 1)]();
}

function makeEmail(first: string, last: string): string {
  const domain = rand(DOMAINS);
  const styles = [
    `${first.toLowerCase()}.${last.toLowerCase()}@${domain}`,
    `${first.toLowerCase()}${last[0].toLowerCase()}@${domain}`,
    `${first[0].toLowerCase()}${last.toLowerCase()}@${domain}`,
  ];
  return styles[randInt(0, styles.length - 1)];
}

type FieldKey =
  | "fullName" | "firstName" | "lastName" | "email" | "phone" | "company"
  | "jobTitle" | "address" | "uuid" | "dob" | "website" | "creditCard"
  | "ip" | "username" | "avatar" | "lorem" | "number";

type Row = Partial<Record<FieldKey, string>>;

const FIELD_LABELS: Record<FieldKey, string> = {
  fullName: "Full Name",
  firstName: "First Name",
  lastName: "Last Name",
  email: "Email",
  phone: "Phone",
  company: "Company",
  jobTitle: "Job Title",
  address: "Address",
  uuid: "UUID",
  dob: "Date of Birth",
  website: "Website URL",
  creditCard: "Credit Card",
  ip: "IP Address",
  username: "Username",
  avatar: "Avatar URL",
  lorem: "Lorem Sentence",
  number: "Number",
};

const ALL_FIELDS: FieldKey[] = [
  "fullName","firstName","lastName","email","phone","company","jobTitle",
  "address","uuid","dob","website","creditCard","ip","username","avatar","lorem","number",
];

function generateRow(fields: FieldKey[]): Row {
  const first = rand(FIRST_NAMES);
  const last = rand(LAST_NAMES);
  const row: Row = {};

  for (const f of fields) {
    switch (f) {
      case "fullName":    row.fullName    = `${first} ${last}`; break;
      case "firstName":   row.firstName   = first; break;
      case "lastName":    row.lastName    = last; break;
      case "email":       row.email       = makeEmail(first, last); break;
      case "phone":       row.phone       = makePhone(); break;
      case "company":     row.company     = rand(COMPANIES); break;
      case "jobTitle":    row.jobTitle    = rand(JOB_TITLES); break;
      case "address":     row.address     = `${randInt(1, 9999)} ${rand(STREET_NAMES)}, ${rand(CITIES)}, ${rand(STATES)} ${randInt(10000, 99999)}, US`; break;
      case "uuid":        row.uuid        = makeUUID(); break;
      case "dob":         row.dob         = makeDOB(); break;
      case "website":     row.website     = `https://www.${rand(WEBSITE_DOMAINS)}`; break;
      case "creditCard":  row.creditCard  = makeCreditCard(); break;
      case "ip":          row.ip          = makeIP(); break;
      case "username":    row.username    = makeUsername(first, last); break;
      case "avatar":      row.avatar      = `https://picsum.photos/seed/${makeUUID().slice(0,8)}/200/200`; break;
      case "lorem":       row.lorem       = rand(LOREM_SENTENCES); break;
      case "number":      row.number      = String(randInt(1, 1000)); break;
    }
  }
  return row;
}

function toJSON(rows: Row[], fields: FieldKey[]): string {
  const objs = rows.map(r => {
    const o: Record<string, string> = {};
    for (const f of fields) o[FIELD_LABELS[f]] = r[f] ?? "";
    return o;
  });
  return JSON.stringify(objs, null, 2);
}

function toCSV(rows: Row[], fields: FieldKey[]): string {
  const header = fields.map(f => `"${FIELD_LABELS[f]}"`).join(",");
  const body = rows.map(r =>
    fields.map(f => `"${(r[f] ?? "").replace(/"/g, '""')}"`).join(",")
  );
  return [header, ...body].join("\n");
}

function toSQL(rows: Row[], fields: FieldKey[]): string {
  const cols = fields.map(f => FIELD_LABELS[f].toLowerCase().replace(/ /g, "_")).join(", ");
  return rows.map(r => {
    const vals = fields.map(f => `'${(r[f] ?? "").replace(/'/g, "''")}'`).join(", ");
    return `INSERT INTO fake_data (${cols}) VALUES (${vals});`;
  }).join("\n");
}

function toJS(rows: Row[], fields: FieldKey[]): string {
  const objs = rows.map(r => {
    const o: Record<string, string> = {};
    for (const f of fields) o[FIELD_LABELS[f]] = r[f] ?? "";
    return o;
  });
  return `const fakeData = ${JSON.stringify(objs, null, 2)};`;
}

const ACCENT = "#00d4aa";
const ACCENT_DIM = "rgba(0,212,170,0.4)";
const ACCENT_BORDER = "rgba(0,212,170,0.15)";
const BG = "#0a0a0a";
const ROW_A = "#0f0f0f";
const ROW_B = "#141414";
const HEADER_BG = "#111";

export default function FakeDataGenerator() {
  const [selectedFields, setSelectedFields] = useState<Set<FieldKey>>(
    new Set(["fullName", "email", "phone", "company", "jobTitle"])
  );
  const [count, setCount] = useState(10);
  const [format, setFormat] = useState<"json" | "csv" | "sql" | "js">("json");
  const [rows, setRows] = useState<Row[]>([]);
  const [output, setOutput] = useState("");
  const [copied, setCopied] = useState(false);
  const [generated, setGenerated] = useState(false);

  const toggleField = (f: FieldKey) => {
    setSelectedFields(prev => {
      const next = new Set(prev);
      if (next.has(f)) {
        if (next.size === 1) return prev;
        next.delete(f);
      } else {
        next.add(f);
      }
      return next;
    });
  };

  const activeFields = ALL_FIELDS.filter(f => selectedFields.has(f));

  const generate = useCallback(() => {
    const newRows = Array.from({ length: count }, () => generateRow(activeFields));
    setRows(newRows);
    let out = "";
    if (format === "json") out = toJSON(newRows, activeFields);
    else if (format === "csv") out = toCSV(newRows, activeFields);
    else if (format === "sql") out = toSQL(newRows, activeFields);
    else out = toJS(newRows, activeFields);
    setOutput(out);
    setGenerated(true);
  }, [count, format, activeFields]);

  const handleCopy = async () => {
    if (!output) return;
    await navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    if (!output) return;
    const ext = format === "csv" ? "csv" : format === "sql" ? "sql" : format === "js" ? "js" : "json";
    const mime = format === "csv" ? "text/csv" : "application/json";
    const blob = new Blob([output], { type: mime });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `fake-data.${ext}`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const inputStyle = {
    background: HEADER_BG,
    border: `1px solid ${ACCENT_BORDER}`,
    color: ACCENT,
    fontFamily: "monospace",
    fontSize: "12px",
    borderRadius: "6px",
    padding: "6px 10px",
    outline: "none",
  } as React.CSSProperties;

  return (
    <div style={{ fontFamily: "monospace", color: ACCENT }}>
      <div
        className="rounded-[16px] p-6 mb-5"
        style={{ background: HEADER_BG, border: `1px solid ${ACCENT_BORDER}` }}
      >
        <p style={{ fontSize: "10px", letterSpacing: "0.14em", color: ACCENT_DIM, marginBottom: "14px", textTransform: "uppercase" }}>
          Fields to include
        </p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(155px,1fr))", gap: "7px" }}>
          {ALL_FIELDS.map(f => {
            const active = selectedFields.has(f);
            return (
              <button
                key={f}
                onClick={() => toggleField(f)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  padding: "7px 10px",
                  borderRadius: "7px",
                  border: `1px solid ${active ? ACCENT_BORDER : "rgba(0,212,170,0.06)"}`,
                  background: active ? "rgba(0,212,170,0.07)" : "rgba(255,255,255,0.01)",
                  color: active ? ACCENT : "rgba(0,212,170,0.35)",
                  fontSize: "11px",
                  fontFamily: "monospace",
                  cursor: "pointer",
                  textAlign: "left",
                  transition: "all 0.15s",
                }}
              >
                <span style={{
                  width: "12px",
                  height: "12px",
                  borderRadius: "3px",
                  border: `1px solid ${active ? ACCENT : "rgba(0,212,170,0.2)"}`,
                  background: active ? ACCENT : "transparent",
                  flexShrink: 0,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}>
                  {active && (
                    <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                      <path d="M1 4l2 2 4-4" stroke="#0a0a0a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  )}
                </span>
                {FIELD_LABELS[f]}
              </button>
            );
          })}
        </div>
      </div>

      <div
        className="rounded-[16px] p-6 mb-5"
        style={{ background: HEADER_BG, border: `1px solid ${ACCENT_BORDER}` }}
      >
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
          <div>
            <p style={{ fontSize: "10px", letterSpacing: "0.14em", color: ACCENT_DIM, marginBottom: "10px", textTransform: "uppercase" }}>
              Row count: <span style={{ color: ACCENT }}>{count}</span>
            </p>
            <input
              type="range"
              min={1}
              max={100}
              value={count}
              onChange={e => setCount(Number(e.target.value))}
              style={{ width: "100%", accentColor: ACCENT, cursor: "pointer" }}
            />
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: "9px", color: "rgba(0,212,170,0.25)", marginTop: "4px" }}>
              <span>1</span><span>100</span>
            </div>
            <input
              type="number"
              min={1}
              max={100}
              value={count}
              onChange={e => setCount(Math.min(100, Math.max(1, Number(e.target.value))))}
              style={{ ...inputStyle, width: "80px", marginTop: "10px" }}
            />
          </div>

          <div>
            <p style={{ fontSize: "10px", letterSpacing: "0.14em", color: ACCENT_DIM, marginBottom: "10px", textTransform: "uppercase" }}>
              Output format
            </p>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "6px" }}>
              {(["json","csv","sql","js"] as const).map(f => (
                <button
                  key={f}
                  onClick={() => setFormat(f)}
                  style={{
                    padding: "8px",
                    borderRadius: "7px",
                    border: `1px solid ${format === f ? ACCENT : ACCENT_BORDER}`,
                    background: format === f ? "rgba(0,212,170,0.1)" : "transparent",
                    color: format === f ? ACCENT : ACCENT_DIM,
                    fontSize: "11px",
                    fontFamily: "monospace",
                    cursor: "pointer",
                    fontWeight: format === f ? 700 : 400,
                    transition: "all 0.15s",
                    textTransform: "uppercase",
                    letterSpacing: "0.08em",
                  }}
                >
                  {f === "json" ? "JSON" : f === "csv" ? "CSV" : f === "sql" ? "SQL INSERT" : "JS Array"}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div style={{ display: "flex", gap: "10px", marginTop: "20px" }}>
          <button
            onClick={generate}
            style={{
              padding: "10px 24px",
              borderRadius: "8px",
              border: "none",
              background: ACCENT,
              color: "#0a0a0a",
              fontSize: "12px",
              fontFamily: "monospace",
              fontWeight: 700,
              cursor: "pointer",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              transition: "opacity 0.15s",
            }}
            onMouseOver={e => (e.currentTarget.style.opacity = "0.85")}
            onMouseOut={e => (e.currentTarget.style.opacity = "1")}
          >
            Generate {count} rows
          </button>

          {generated && (
            <>
              <button
                onClick={handleCopy}
                style={{
                  padding: "10px 18px",
                  borderRadius: "8px",
                  border: `1px solid ${ACCENT_BORDER}`,
                  background: "transparent",
                  color: copied ? ACCENT : ACCENT_DIM,
                  fontSize: "12px",
                  fontFamily: "monospace",
                  cursor: "pointer",
                  letterSpacing: "0.06em",
                  transition: "all 0.15s",
                }}
              >
                {copied ? "Copied!" : "Copy All"}
              </button>
              <button
                onClick={handleDownload}
                style={{
                  padding: "10px 18px",
                  borderRadius: "8px",
                  border: `1px solid ${ACCENT_BORDER}`,
                  background: "transparent",
                  color: ACCENT_DIM,
                  fontSize: "12px",
                  fontFamily: "monospace",
                  cursor: "pointer",
                  letterSpacing: "0.06em",
                  transition: "all 0.15s",
                }}
                onMouseOver={e => (e.currentTarget.style.color = ACCENT)}
                onMouseOut={e => (e.currentTarget.style.color = ACCENT_DIM)}
              >
                Download .{format === "csv" ? "csv" : format === "sql" ? "sql" : format === "js" ? "js" : "json"}
              </button>
            </>
          )}
        </div>
      </div>

      {generated && rows.length > 0 && (
        <>
          <div
            className="rounded-[16px] mb-5 overflow-hidden"
            style={{ border: `1px solid ${ACCENT_BORDER}` }}
          >
            <div
              style={{
                overflowX: "auto",
                maxHeight: "420px",
                overflowY: "auto",
              }}
            >
              <table style={{ width: "100%", borderCollapse: "collapse", minWidth: "100%" }}>
                <thead style={{ position: "sticky", top: 0, zIndex: 1 }}>
                  <tr style={{ background: HEADER_BG }}>
                    <th style={{
                      padding: "9px 12px",
                      fontSize: "9px",
                      fontWeight: 600,
                      letterSpacing: "0.13em",
                      textTransform: "uppercase",
                      color: ACCENT,
                      textAlign: "left",
                      borderBottom: `1px solid ${ACCENT_BORDER}`,
                      borderRight: `1px solid ${ACCENT_BORDER}`,
                      whiteSpace: "nowrap",
                      fontFamily: "monospace",
                    }}>
                      #
                    </th>
                    {activeFields.map(f => (
                      <th
                        key={f}
                        style={{
                          padding: "9px 12px",
                          fontSize: "9px",
                          fontWeight: 600,
                          letterSpacing: "0.13em",
                          textTransform: "uppercase",
                          color: ACCENT,
                          textAlign: "left",
                          borderBottom: `1px solid ${ACCENT_BORDER}`,
                          borderRight: `1px solid ${ACCENT_BORDER}`,
                          whiteSpace: "nowrap",
                          fontFamily: "monospace",
                          background: HEADER_BG,
                        }}
                      >
                        {FIELD_LABELS[f]}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {rows.map((row, i) => (
                    <tr
                      key={i}
                      style={{ background: i % 2 === 0 ? ROW_A : ROW_B }}
                    >
                      <td style={{
                        padding: "7px 12px",
                        fontSize: "11px",
                        color: "rgba(0,212,170,0.25)",
                        borderRight: `1px solid ${ACCENT_BORDER}`,
                        borderBottom: `1px solid rgba(0,212,170,0.05)`,
                        fontFamily: "monospace",
                        whiteSpace: "nowrap",
                      }}>
                        {i + 1}
                      </td>
                      {activeFields.map(f => (
                        <td
                          key={f}
                          style={{
                            padding: "7px 12px",
                            fontSize: "11px",
                            color: "rgba(0,212,170,0.75)",
                            borderRight: `1px solid rgba(0,212,170,0.05)`,
                            borderBottom: `1px solid rgba(0,212,170,0.05)`,
                            fontFamily: "monospace",
                            whiteSpace: f === "address" || f === "lorem" ? "normal" : "nowrap",
                            maxWidth: f === "address" || f === "lorem" ? "260px" : undefined,
                          }}
                        >
                          {f === "avatar"
                            ? <a href={row[f]} target="_blank" rel="noopener noreferrer" style={{ color: ACCENT, textDecoration: "underline", fontSize: "10px" }}>view</a>
                            : (row[f] ?? "")}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div
            className="rounded-[16px] overflow-hidden"
            style={{ border: `1px solid ${ACCENT_BORDER}` }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "10px 16px",
                background: HEADER_BG,
                borderBottom: `1px solid ${ACCENT_BORDER}`,
              }}
            >
              <span style={{ fontSize: "10px", letterSpacing: "0.12em", textTransform: "uppercase", color: ACCENT_DIM }}>
                {format.toUpperCase()} output — {rows.length} rows
              </span>
              <button
                onClick={handleCopy}
                style={{
                  fontSize: "10px",
                  fontFamily: "monospace",
                  letterSpacing: "0.1em",
                  color: copied ? ACCENT : ACCENT_DIM,
                  background: "transparent",
                  border: "none",
                  cursor: "pointer",
                  textTransform: "uppercase",
                }}
              >
                {copied ? "Copied!" : "Copy"}
              </button>
            </div>
            <pre
              style={{
                margin: 0,
                padding: "16px",
                fontSize: "11px",
                lineHeight: 1.7,
                color: "rgba(0,212,170,0.65)",
                background: ROW_A,
                overflowX: "auto",
                overflowY: "auto",
                maxHeight: "400px",
                fontFamily: "monospace",
                whiteSpace: "pre",
              }}
            >
              {output}
            </pre>
          </div>
        </>
      )}

      {!generated && (
        <div
          className="rounded-[16px] flex items-center justify-center"
          style={{
            height: "140px",
            border: `1px dashed ${ACCENT_BORDER}`,
            color: "rgba(0,212,170,0.2)",
            fontSize: "12px",
            fontFamily: "monospace",
            letterSpacing: "0.1em",
          }}
        >
          SELECT FIELDS &rarr; CONFIGURE &rarr; GENERATE
        </div>
      )}
    </div>
  );
}
