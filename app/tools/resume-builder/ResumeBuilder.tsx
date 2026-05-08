"use client";
import { useState, useEffect, useCallback } from "react";

type Bullet = { id: number; text: string };
type Job = {
  id: number;
  company: string;
  position: string;
  location: string;
  startDate: string;
  endDate: string;
  current: boolean;
  bullets: Bullet[];
};
type Education = {
  id: number;
  institution: string;
  degree: string;
  field: string;
  startYear: string;
  endYear: string;
  gpa: string;
};
type SkillGroup = {
  category: string;
  skills: string[];
};
type Certification = {
  id: number;
  name: string;
  issuer: string;
  date: string;
};

type ResumeData = {
  fullName: string;
  jobTitle: string;
  email: string;
  phone: string;
  location: string;
  linkedin: string;
  website: string;
  summary: string;
  experience: Job[];
  education: Education[];
  skillGroups: SkillGroup[];
  certifications: Certification[];
};

const SKILL_CATEGORIES = ["Technical", "Soft", "Languages", "Tools"];

const defaultData = (): ResumeData => ({
  fullName: "",
  jobTitle: "",
  email: "",
  phone: "",
  location: "",
  linkedin: "",
  website: "",
  summary: "",
  experience: [
    {
      id: 1,
      company: "",
      position: "",
      location: "",
      startDate: "",
      endDate: "",
      current: false,
      bullets: [{ id: 1, text: "" }],
    },
  ],
  education: [
    {
      id: 1,
      institution: "",
      degree: "",
      field: "",
      startYear: "",
      endYear: "",
      gpa: "",
    },
  ],
  skillGroups: SKILL_CATEGORIES.map((category) => ({ category, skills: [] })),
  certifications: [],
});

let _jobId = 2;
let _eduId = 2;
let _certId = 1;
let _bulletId = 2;

const TEAL = "#0f766e";
const TEAL_BG = "#f0fdfa";
const TEAL_BORDER = "#99f6e4";

const labelSt: React.CSSProperties = {
  display: "block",
  marginBottom: "5px",
  fontSize: "10px",
  fontWeight: 700,
  letterSpacing: "0.12em",
  textTransform: "uppercase",
  color: "rgba(15,23,42,0.45)",
};

const inputSt: React.CSSProperties = {
  width: "100%",
  background: "#ffffff",
  border: "1.5px solid #e2e8f0",
  borderRadius: "10px",
  padding: "10px 13px",
  fontSize: "13.5px",
  color: "#0f172a",
  fontFamily: "inherit",
  outline: "none",
  transition: "border-color 0.15s",
  boxSizing: "border-box",
};

const sectionSt: React.CSSProperties = {
  background: "#ffffff",
  borderRadius: "16px",
  padding: "22px",
  marginBottom: "14px",
  boxShadow: "0 0 0 1px rgba(15,23,42,0.07), 0 2px 12px rgba(15,23,42,0.04)",
};

const sectionHeadSt: React.CSSProperties = {
  fontSize: "11px",
  fontWeight: 700,
  letterSpacing: "0.13em",
  textTransform: "uppercase",
  color: TEAL,
  marginBottom: "14px",
  paddingBottom: "10px",
  borderBottom: "1px solid #e2e8f0",
};

function onFocus(e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) {
  e.currentTarget.style.borderColor = TEAL;
}
function onBlur(e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) {
  e.currentTarget.style.borderColor = "#e2e8f0";
}

function Input({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: string;
}) {
  return (
    <div>
      <label style={labelSt}>{label}</label>
      <input
        type={type}
        style={inputSt}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={onFocus}
        onBlur={onBlur}
        placeholder={placeholder}
      />
    </div>
  );
}

export default function ResumeBuilder() {
  const [data, setData] = useState<ResumeData>(() => {
    if (typeof window === "undefined") return defaultData();
    try {
      const saved = localStorage.getItem("resume-builder-data");
      if (saved) return JSON.parse(saved) as ResumeData;
    } catch {
      /* ignore */
    }
    return defaultData();
  });

  const [skillInput, setSkillInput] = useState<Record<string, string>>(
    Object.fromEntries(SKILL_CATEGORIES.map((c) => [c, ""]))
  );

  useEffect(() => {
    const style = document.createElement("style");
    style.id = "resume-print-style";
    style.textContent = `@media print {body * {visibility:hidden;}#resume-preview,#resume-preview *{visibility:visible;}#resume-preview{position:absolute;inset:0;margin:0;padding:0;box-shadow:none!important;border-radius:0!important;}}`;
    document.head.appendChild(style);
    return () => {
      document.getElementById("resume-print-style")?.remove();
    };
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem("resume-builder-data", JSON.stringify(data));
    } catch {
      /* ignore */
    }
  }, [data]);

  const set = useCallback(<K extends keyof ResumeData>(key: K, value: ResumeData[K]) => {
    setData((prev) => ({ ...prev, [key]: value }));
  }, []);

  const addJob = useCallback(() => {
    const id = _jobId++;
    setData((prev) => ({
      ...prev,
      experience: [
        ...prev.experience,
        {
          id,
          company: "",
          position: "",
          location: "",
          startDate: "",
          endDate: "",
          current: false,
          bullets: [{ id: _bulletId++, text: "" }],
        },
      ],
    }));
  }, []);

  const removeJob = useCallback((id: number) => {
    setData((prev) => ({
      ...prev,
      experience: prev.experience.length > 1 ? prev.experience.filter((j) => j.id !== id) : prev.experience,
    }));
  }, []);

  const setJob = useCallback((id: number, field: keyof Omit<Job, "id" | "bullets">, value: string | boolean) => {
    setData((prev) => ({
      ...prev,
      experience: prev.experience.map((j) => (j.id === id ? { ...j, [field]: value } : j)),
    }));
  }, []);

  const addBullet = useCallback((jobId: number) => {
    const bid = _bulletId++;
    setData((prev) => ({
      ...prev,
      experience: prev.experience.map((j) =>
        j.id === jobId ? { ...j, bullets: [...j.bullets, { id: bid, text: "" }] } : j
      ),
    }));
  }, []);

  const removeBullet = useCallback((jobId: number, bulletId: number) => {
    setData((prev) => ({
      ...prev,
      experience: prev.experience.map((j) =>
        j.id === jobId
          ? { ...j, bullets: j.bullets.length > 1 ? j.bullets.filter((b) => b.id !== bulletId) : j.bullets }
          : j
      ),
    }));
  }, []);

  const setBullet = useCallback((jobId: number, bulletId: number, text: string) => {
    setData((prev) => ({
      ...prev,
      experience: prev.experience.map((j) =>
        j.id === jobId
          ? { ...j, bullets: j.bullets.map((b) => (b.id === bulletId ? { ...b, text } : b)) }
          : j
      ),
    }));
  }, []);

  const addEdu = useCallback(() => {
    const id = _eduId++;
    setData((prev) => ({
      ...prev,
      education: [
        ...prev.education,
        { id, institution: "", degree: "", field: "", startYear: "", endYear: "", gpa: "" },
      ],
    }));
  }, []);

  const removeEdu = useCallback((id: number) => {
    setData((prev) => ({
      ...prev,
      education: prev.education.length > 1 ? prev.education.filter((e) => e.id !== id) : prev.education,
    }));
  }, []);

  const setEdu = useCallback((id: number, field: keyof Omit<Education, "id">, value: string) => {
    setData((prev) => ({
      ...prev,
      education: prev.education.map((e) => (e.id === id ? { ...e, [field]: value } : e)),
    }));
  }, []);

  const addSkill = useCallback((category: string, raw: string) => {
    const tags = raw
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);
    if (!tags.length) return;
    setData((prev) => ({
      ...prev,
      skillGroups: prev.skillGroups.map((g) =>
        g.category === category
          ? { ...g, skills: Array.from(new Set([...g.skills, ...tags])) }
          : g
      ),
    }));
    setSkillInput((prev) => ({ ...prev, [category]: "" }));
  }, []);

  const removeSkill = useCallback((category: string, skill: string) => {
    setData((prev) => ({
      ...prev,
      skillGroups: prev.skillGroups.map((g) =>
        g.category === category ? { ...g, skills: g.skills.filter((s) => s !== skill) } : g
      ),
    }));
  }, []);

  const addCert = useCallback(() => {
    const id = _certId++;
    setData((prev) => ({
      ...prev,
      certifications: [...prev.certifications, { id, name: "", issuer: "", date: "" }],
    }));
  }, []);

  const removeCert = useCallback((id: number) => {
    setData((prev) => ({
      ...prev,
      certifications: prev.certifications.filter((c) => c.id !== id),
    }));
  }, []);

  const setCert = useCallback((id: number, field: keyof Omit<Certification, "id">, value: string) => {
    setData((prev) => ({
      ...prev,
      certifications: prev.certifications.map((c) => (c.id === id ? { ...c, [field]: value } : c)),
    }));
  }, []);

  const handleClear = useCallback(() => {
    if (window.confirm("Clear all resume data and start over? This cannot be undone.")) {
      const fresh = defaultData();
      setData(fresh);
      try {
        localStorage.setItem("resume-builder-data", JSON.stringify(fresh));
      } catch {
        /* ignore */
      }
    }
  }, []);

  const previewSection: React.CSSProperties = {
    marginBottom: "20px",
    paddingBottom: "16px",
    borderBottom: "1px solid #e5e7eb",
  };

  const previewSectionHead: React.CSSProperties = {
    fontSize: "10px",
    fontWeight: 700,
    letterSpacing: "0.18em",
    textTransform: "uppercase" as const,
    color: "#1a202c",
    marginBottom: "10px",
    paddingLeft: "10px",
    borderLeft: `3px solid ${TEAL}`,
    fontVariant: "small-caps",
  };

  return (
    <div
      style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "28px", alignItems: "start" }}
      className="rb-grid"
    >
      <style>{`
        @media (max-width: 960px) { .rb-grid { grid-template-columns: 1fr !important; } }
        input[type=number]::-webkit-inner-spin-button,
        input[type=number]::-webkit-outer-spin-button { -webkit-appearance: none; margin: 0; }
        .rb-bullet-row { display: flex; align-items: center; gap: 8px; margin-bottom: 8px; }
        .rb-remove-btn { flex-shrink: 0; background: none; border: none; cursor: pointer; color: #dc2626; font-size: 18px; line-height: 1; padding: 2px 4px; opacity: 0.65; transition: opacity 0.15s; }
        .rb-remove-btn:hover { opacity: 1; }
        .rb-add-btn { display: inline-flex; align-items: center; gap: 6px; padding: 7px 14px; border-radius: 8px; border: 1.5px dashed ${TEAL}; background: none; color: ${TEAL}; font-size: 12px; font-weight: 600; cursor: pointer; transition: background 0.15s; font-family: inherit; }
        .rb-add-btn:hover { background: ${TEAL_BG}; }
        .rb-skill-tag { display: inline-flex; align-items: center; gap: 5px; padding: 4px 10px; border-radius: 999px; background: ${TEAL_BG}; border: 1px solid ${TEAL_BORDER}; font-size: 11.5px; color: ${TEAL}; font-weight: 600; margin: 3px; }
        .rb-skill-tag button { background: none; border: none; cursor: pointer; color: ${TEAL}; font-size: 13px; line-height: 1; padding: 0; opacity: 0.6; }
        .rb-skill-tag button:hover { opacity: 1; }
        .rb-clear-btn { background: none; border: 1.5px solid #e2e8f0; border-radius: 8px; padding: 8px 14px; font-size: 12px; font-weight: 600; color: rgba(15,23,42,0.45); cursor: pointer; font-family: inherit; transition: border-color 0.15s, color 0.15s; }
        .rb-clear-btn:hover { border-color: #dc2626; color: #dc2626; }
        .rb-download-btn { width: 100%; padding: 14px; border-radius: 12px; border: none; background: linear-gradient(135deg, ${TEAL}, #0d9488); color: #ffffff; font-size: 14px; font-weight: 700; cursor: pointer; letter-spacing: 0.03em; box-shadow: 0 4px 16px rgba(15,118,110,0.35); transition: opacity 0.15s; font-family: inherit; }
        .rb-download-btn:hover { opacity: 0.88; }
      `}</style>

      {/* ── LEFT: FORM ── */}
      <div style={{ background: "#f8f9fa", borderRadius: "20px", padding: "24px" }}>

        {/* Personal Info */}
        <div style={sectionSt}>
          <p style={sectionHeadSt}>Personal Information</p>
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
              <Input label="Full Name" value={data.fullName} onChange={(v) => set("fullName", v)} placeholder="Jane Smith" />
              <Input label="Job Title / Role" value={data.jobTitle} onChange={(v) => set("jobTitle", v)} placeholder="Senior Software Engineer" />
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
              <Input label="Email" value={data.email} onChange={(v) => set("email", v)} placeholder="jane@example.com" type="email" />
              <Input label="Phone" value={data.phone} onChange={(v) => set("phone", v)} placeholder="+1 (555) 000-0000" />
            </div>
            <Input label="Location" value={data.location} onChange={(v) => set("location", v)} placeholder="New York, NY" />
            <Input label="LinkedIn URL" value={data.linkedin} onChange={(v) => set("linkedin", v)} placeholder="linkedin.com/in/janesmith" />
            <Input label="Website / Portfolio" value={data.website} onChange={(v) => set("website", v)} placeholder="janesmith.dev" />
          </div>
        </div>

        {/* Summary */}
        <div style={sectionSt}>
          <p style={sectionHeadSt}>Professional Summary</p>
          <textarea
            style={{ ...inputSt, resize: "vertical", minHeight: "96px", lineHeight: 1.65 }}
            value={data.summary}
            onChange={(e) => set("summary", e.target.value)}
            onFocus={onFocus}
            onBlur={onBlur}
            placeholder="Results-driven engineer with 5+ years of experience building scalable web applications..."
          />
        </div>

        {/* Experience */}
        <div style={sectionSt}>
          <p style={sectionHeadSt}>Work Experience</p>
          {data.experience.map((job, ji) => (
            <div
              key={job.id}
              style={{
                border: "1.5px solid #e2e8f0",
                borderRadius: "12px",
                padding: "16px",
                marginBottom: "12px",
                background: "#fafafa",
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
                <span style={{ fontSize: "11px", fontWeight: 700, color: "rgba(15,23,42,0.4)", textTransform: "uppercase", letterSpacing: "0.1em" }}>
                  Job {ji + 1}
                </span>
                <button
                  className="rb-remove-btn"
                  onClick={() => removeJob(job.id)}
                  disabled={data.experience.length === 1}
                  style={{ opacity: data.experience.length === 1 ? 0.2 : undefined }}
                  title="Remove job"
                >
                  ×
                </button>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
                  <Input label="Company" value={job.company} onChange={(v) => setJob(job.id, "company", v)} placeholder="Acme Corp" />
                  <Input label="Position" value={job.position} onChange={(v) => setJob(job.id, "position", v)} placeholder="Software Engineer" />
                </div>
                <Input label="Location" value={job.location} onChange={(v) => setJob(job.id, "location", v)} placeholder="San Francisco, CA" />
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
                  <Input label="Start Date" value={job.startDate} onChange={(v) => setJob(job.id, "startDate", v)} placeholder="Jan 2020" />
                  <div>
                    <label style={labelSt}>End Date</label>
                    <input
                      type="text"
                      style={{ ...inputSt, opacity: job.current ? 0.4 : 1 }}
                      value={job.current ? "Present" : job.endDate}
                      onChange={(e) => setJob(job.id, "endDate", e.target.value)}
                      onFocus={onFocus}
                      onBlur={onBlur}
                      placeholder="Dec 2023"
                      disabled={job.current}
                    />
                  </div>
                </div>
                <label style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "12.5px", color: "rgba(15,23,42,0.6)", cursor: "pointer" }}>
                  <input
                    type="checkbox"
                    checked={job.current}
                    onChange={(e) => setJob(job.id, "current", e.target.checked)}
                    style={{ accentColor: TEAL, width: "14px", height: "14px" }}
                  />
                  Currently working here
                </label>
                <div>
                  <label style={labelSt}>Bullet Points</label>
                  {job.bullets.map((b) => (
                    <div key={b.id} className="rb-bullet-row">
                      <span style={{ color: TEAL, fontWeight: 700, fontSize: "13px" }}>•</span>
                      <input
                        type="text"
                        style={{ ...inputSt, flex: 1 }}
                        value={b.text}
                        onChange={(e) => setBullet(job.id, b.id, e.target.value)}
                        onFocus={onFocus}
                        onBlur={onBlur}
                        placeholder="Increased API response time by 40% through caching…"
                      />
                      <button
                        className="rb-remove-btn"
                        onClick={() => removeBullet(job.id, b.id)}
                        disabled={job.bullets.length === 1}
                        style={{ opacity: job.bullets.length === 1 ? 0.2 : undefined }}
                        title="Remove bullet"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                  <button className="rb-add-btn" onClick={() => addBullet(job.id)}>
                    + Add Bullet
                  </button>
                </div>
              </div>
            </div>
          ))}
          <button className="rb-add-btn" onClick={addJob}>
            + Add Job
          </button>
        </div>

        {/* Education */}
        <div style={sectionSt}>
          <p style={sectionHeadSt}>Education</p>
          {data.education.map((edu, ei) => (
            <div
              key={edu.id}
              style={{
                border: "1.5px solid #e2e8f0",
                borderRadius: "12px",
                padding: "16px",
                marginBottom: "12px",
                background: "#fafafa",
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
                <span style={{ fontSize: "11px", fontWeight: 700, color: "rgba(15,23,42,0.4)", textTransform: "uppercase", letterSpacing: "0.1em" }}>
                  Education {ei + 1}
                </span>
                <button
                  className="rb-remove-btn"
                  onClick={() => removeEdu(edu.id)}
                  disabled={data.education.length === 1}
                  style={{ opacity: data.education.length === 1 ? 0.2 : undefined }}
                  title="Remove"
                >
                  ×
                </button>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                <Input label="Institution" value={edu.institution} onChange={(v) => setEdu(edu.id, "institution", v)} placeholder="Harvard University" />
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
                  <Input label="Degree" value={edu.degree} onChange={(v) => setEdu(edu.id, "degree", v)} placeholder="Bachelor of Science" />
                  <Input label="Field of Study" value={edu.field} onChange={(v) => setEdu(edu.id, "field", v)} placeholder="Computer Science" />
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "10px" }}>
                  <Input label="Start Year" value={edu.startYear} onChange={(v) => setEdu(edu.id, "startYear", v)} placeholder="2016" />
                  <Input label="End Year" value={edu.endYear} onChange={(v) => setEdu(edu.id, "endYear", v)} placeholder="2020" />
                  <Input label="GPA (opt.)" value={edu.gpa} onChange={(v) => setEdu(edu.id, "gpa", v)} placeholder="3.8" />
                </div>
              </div>
            </div>
          ))}
          <button className="rb-add-btn" onClick={addEdu}>
            + Add Education
          </button>
        </div>

        {/* Skills */}
        <div style={sectionSt}>
          <p style={sectionHeadSt}>Skills</p>
          {data.skillGroups.map((g) => (
            <div key={g.category} style={{ marginBottom: "16px" }}>
              <label style={labelSt}>{g.category}</label>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "2px", minHeight: "32px", marginBottom: "8px" }}>
                {g.skills.map((s) => (
                  <span key={s} className="rb-skill-tag">
                    {s}
                    <button onClick={() => removeSkill(g.category, s)} title="Remove">×</button>
                  </span>
                ))}
              </div>
              <div style={{ display: "flex", gap: "8px" }}>
                <input
                  type="text"
                  style={{ ...inputSt, flex: 1 }}
                  value={skillInput[g.category] || ""}
                  onChange={(e) => setSkillInput((prev) => ({ ...prev, [g.category]: e.target.value }))}
                  onFocus={onFocus}
                  onBlur={onBlur}
                  placeholder="React, TypeScript, Node.js (comma-separated)"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      addSkill(g.category, skillInput[g.category] || "");
                    }
                  }}
                />
                <button
                  className="rb-add-btn"
                  onClick={() => addSkill(g.category, skillInput[g.category] || "")}
                  style={{ whiteSpace: "nowrap", borderRadius: "10px", padding: "10px 14px" }}
                >
                  Add
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Certifications */}
        <div style={sectionSt}>
          <p style={sectionHeadSt}>Certifications</p>
          {data.certifications.map((cert) => (
            <div key={cert.id} style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr auto", gap: "8px", alignItems: "end", marginBottom: "10px" }}>
              <Input label="Certification Name" value={cert.name} onChange={(v) => setCert(cert.id, "name", v)} placeholder="AWS Solutions Architect" />
              <Input label="Issuer" value={cert.issuer} onChange={(v) => setCert(cert.id, "issuer", v)} placeholder="Amazon Web Services" />
              <Input label="Date" value={cert.date} onChange={(v) => setCert(cert.id, "date", v)} placeholder="Mar 2024" />
              <div style={{ paddingBottom: "1px" }}>
                <button className="rb-remove-btn" onClick={() => removeCert(cert.id)} title="Remove">×</button>
              </div>
            </div>
          ))}
          <button className="rb-add-btn" onClick={addCert}>
            + Add Certification
          </button>
        </div>

        {/* Actions */}
        <div style={{ display: "flex", gap: "12px", marginTop: "4px" }}>
          <button className="rb-download-btn" style={{ flex: 1 }} onClick={() => window.print()}>
            Download PDF
          </button>
          <button className="rb-clear-btn" onClick={handleClear}>
            Clear / Start Over
          </button>
        </div>
      </div>

      {/* ── RIGHT: PREVIEW ── */}
      <div style={{ position: "sticky", top: "80px" }}>
        <div
          id="resume-preview"
          style={{
            background: "#ffffff",
            maxWidth: "720px",
            margin: "0 auto",
            boxShadow: "0 0 40px rgba(0,0,0,0.1)",
            borderRadius: "4px",
            fontFamily: "'Segoe UI', system-ui, -apple-system, sans-serif",
            fontSize: "12px",
            color: "#1a202c",
            minHeight: "900px",
          }}
        >
          {/* Header */}
          <div
            style={{
              padding: "36px 40px 24px",
              borderBottom: `3px solid ${TEAL}`,
              background: "#fff",
            }}
          >
            <h1
              style={{
                margin: 0,
                fontFamily: "Georgia, 'Times New Roman', serif",
                fontSize: "28px",
                fontWeight: 700,
                color: "#1a202c",
                letterSpacing: "-0.01em",
                lineHeight: 1.1,
              }}
            >
              {data.fullName || <span style={{ color: "#cbd5e0" }}>Your Full Name</span>}
            </h1>
            {(data.jobTitle) && (
              <p style={{ margin: "6px 0 0", fontSize: "13.5px", color: TEAL, fontWeight: 600, letterSpacing: "0.02em" }}>
                {data.jobTitle}
              </p>
            )}
            <div
              style={{
                marginTop: "10px",
                display: "flex",
                flexWrap: "wrap",
                gap: "4px 14px",
                fontSize: "11px",
                color: "rgba(26,32,44,0.6)",
              }}
            >
              {data.email && <span>{data.email}</span>}
              {data.phone && <span>{data.phone}</span>}
              {data.location && <span>{data.location}</span>}
              {data.linkedin && <span>{data.linkedin}</span>}
              {data.website && <span>{data.website}</span>}
            </div>
          </div>

          {/* Body */}
          <div style={{ padding: "24px 40px 36px" }}>

            {/* Summary */}
            {data.summary && (
              <div style={previewSection}>
                <div style={previewSectionHead}>Professional Summary</div>
                <p style={{ margin: 0, fontSize: "12px", color: "rgba(26,32,44,0.75)", lineHeight: 1.75 }}>
                  {data.summary}
                </p>
              </div>
            )}

            {/* Experience */}
            {data.experience.some((j) => j.company || j.position) && (
              <div style={previewSection}>
                <div style={previewSectionHead}>Work Experience</div>
                {data.experience.map((job) => {
                  if (!job.company && !job.position) return null;
                  const endLabel = job.current ? "Present" : job.endDate;
                  return (
                    <div key={job.id} style={{ marginBottom: "14px" }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                        <div>
                          <span style={{ fontSize: "13px", fontWeight: 700, color: "#1a202c" }}>{job.company}</span>
                          {job.location && (
                            <span style={{ fontSize: "11px", color: "rgba(26,32,44,0.45)", marginLeft: "6px" }}>
                              — {job.location}
                            </span>
                          )}
                        </div>
                        <span style={{ fontSize: "11px", color: "rgba(26,32,44,0.5)", whiteSpace: "nowrap", marginLeft: "8px" }}>
                          {job.startDate}{job.startDate && (endLabel) ? " – " : ""}{endLabel}
                        </span>
                      </div>
                      {job.position && (
                        <p style={{ margin: "2px 0 6px", fontSize: "12px", fontStyle: "italic", color: TEAL, fontWeight: 600 }}>
                          {job.position}
                        </p>
                      )}
                      {job.bullets.filter((b) => b.text).length > 0 && (
                        <ul style={{ margin: "4px 0 0 16px", padding: 0, listStyle: "disc" }}>
                          {job.bullets.filter((b) => b.text).map((b) => (
                            <li key={b.id} style={{ fontSize: "11.5px", color: "rgba(26,32,44,0.7)", lineHeight: 1.65, marginBottom: "3px" }}>
                              {b.text}
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  );
                })}
              </div>
            )}

            {/* Education */}
            {data.education.some((e) => e.institution || e.degree) && (
              <div style={previewSection}>
                <div style={previewSectionHead}>Education</div>
                {data.education.map((edu) => {
                  if (!edu.institution && !edu.degree) return null;
                  return (
                    <div key={edu.id} style={{ marginBottom: "10px" }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                        <span style={{ fontSize: "13px", fontWeight: 700, color: "#1a202c" }}>{edu.institution}</span>
                        <span style={{ fontSize: "11px", color: "rgba(26,32,44,0.5)", whiteSpace: "nowrap", marginLeft: "8px" }}>
                          {edu.startYear}{edu.startYear && edu.endYear ? " – " : ""}{edu.endYear}
                        </span>
                      </div>
                      <p style={{ margin: "2px 0 0", fontSize: "11.5px", color: "rgba(26,32,44,0.65)" }}>
                        {edu.degree && edu.field
                          ? `${edu.degree} in ${edu.field}`
                          : edu.degree || edu.field}
                        {edu.gpa ? ` | GPA: ${edu.gpa}` : ""}
                      </p>
                    </div>
                  );
                })}
              </div>
            )}

            {/* Skills */}
            {data.skillGroups.some((g) => g.skills.length > 0) && (
              <div style={previewSection}>
                <div style={previewSectionHead}>Skills</div>
                {data.skillGroups
                  .filter((g) => g.skills.length > 0)
                  .map((g) => (
                    <div key={g.category} style={{ marginBottom: "5px", display: "flex", gap: "6px" }}>
                      <span style={{ fontSize: "11.5px", fontWeight: 700, color: "#1a202c", minWidth: "76px" }}>
                        {g.category}:
                      </span>
                      <span style={{ fontSize: "11.5px", color: "rgba(26,32,44,0.7)" }}>{g.skills.join(", ")}</span>
                    </div>
                  ))}
              </div>
            )}

            {/* Certifications */}
            {data.certifications.some((c) => c.name) && (
              <div style={{ ...previewSection, borderBottom: "none", marginBottom: 0, paddingBottom: 0 }}>
                <div style={previewSectionHead}>Certifications</div>
                {data.certifications
                  .filter((c) => c.name)
                  .map((c) => (
                    <div key={c.id} style={{ marginBottom: "5px", fontSize: "11.5px", color: "rgba(26,32,44,0.7)" }}>
                      <span style={{ fontWeight: 700, color: "#1a202c" }}>{c.name}</span>
                      {c.issuer ? ` | ${c.issuer}` : ""}
                      {c.date ? ` | ${c.date}` : ""}
                    </div>
                  ))}
              </div>
            )}

            {/* Empty state */}
            {!data.fullName && !data.summary && !data.experience.some((j) => j.company) && (
              <div style={{ textAlign: "center", padding: "60px 20px", color: "rgba(26,32,44,0.25)" }}>
                <p style={{ fontSize: "28px", marginBottom: "12px" }}>📄</p>
                <p style={{ fontSize: "13px", fontWeight: 600 }}>Your resume preview will appear here</p>
                <p style={{ fontSize: "12px", marginTop: "6px" }}>Fill in the form on the left to get started</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
