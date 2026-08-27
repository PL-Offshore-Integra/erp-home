import { useState, useEffect } from "react";
import { supabase } from "./lib/supabase";

const ADMIN_EMAIL = "federico.ruiz@terra-mare.com.ar";

/* Áreas declaradas del sistema (brand book, parte 01) */
const AREAS = ["Operación", "Documentación", "Administración", "HSE y cumplimiento"];

const EMPRESAS = [
  {
    id: "parana",
    nombre: "PL Offshore",
    codigo: "PLO",
    descripcion: "Transporte marítimo y fluvial sobre la Hidrovía, apoyo offshore y rescate y salvamento.",
    logo: "/PL.png",
    color: "#002247",
    url: "https://integra.ploffshore.com",
    activo: true,
    modulos: ["finanzas", "hsqe", "compras", "viveres", "projects", "mantenimiento", "reparaciones", "certificados", "documentos", "tripulaciones", "cost-tracker"],
    modulosLabel: { finanzas:"Finanzas", hsqe:"HSQE", compras:"Compras", viveres:"Víveres", projects:"Projects", mantenimiento:"Mantenimiento", reparaciones:"Reparaciones", certificados:"Certificados", documentos:"Documentos", tripulaciones:"Tripulaciones", "cost-tracker":"Cost Tracker" },
  },
  {
    id: "cleansea",
    nombre: "Clean Sea",
    codigo: "CS",
    descripcion: "Respuesta y prevención de derrames, salvamento marítimo y transferencia de cargas líquidas.",
    logo: "/CS.png",
    color: "#009460",
    url: "https://integra.cleansea.com.ar",
    activo: true,
    modulos: ["hsqe", "inventario", "viveres"],
    modulosLabel: { hsqe:"HSQE", inventario:"Inventario", viveres:"Víveres" },
  },
  {
    id: "terramare",
    nombre: "Terra Mare Services",
    codigo: "TMS",
    descripcion: "Servicios de apoyo a oil & gas: tripulaciones, husbandry, logística y contenedores DNV/ISO.",
    logo: "/logo-tm.png",
    color: "#235C96",
    url: "https://integra.home.terra-mare.com.ar",
    activo: true,
    modulos: ["hsqe", "pipeline", "dashboards"],
    modulosLabel: { hsqe:"HSQE", pipeline:"Pipeline", dashboards:"Dashboards" },
  },
  {
    id: "proyectos",
    nombre: "Evaluación de Proyectos",
    codigo: "EVAL",
    descripcion: "Herramientas de análisis para evaluación de inversiones y nuevos negocios del grupo.",
    logo: null,
    color: "#082F4E",
    url: "https://evaluacion-proyectos.vercel.app",
    activo: true,
    modulos: ["ais-analyzer", "transporte-arena", "evaluacion-gdm"],
    modulosLabel: { "ais-analyzer":"AIS Analyzer", "transporte-arena":"Transporte de Arena", "evaluacion-gdm":"Evaluación GdM" },
    esProyectos: true,
  },
];

/* ─── LOGIN ─────────────────────────────────────────────────────────────────── */
function LoginPage() {
  const [email, setEmail]     = useState("");
  const [pass, setPass]       = useState("");
  const [show, setShow]       = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState("");

  const handleLogin = async () => {
    setLoading(true); setError("");
    try {
      const { error: e } = await supabase.auth.signInWithPassword({ email, password: pass });
      if (e) setError("Revisá el correo y la contraseña. La cuenta no coincide.");
    } catch {
      setError("No se pudo conectar con el servidor. Verificá tu red e intentá de nuevo.");
    } finally {
      setLoading(false);
    }
  };

  const handleKey = (e) => { if (e.key === "Enter") handleLogin(); };

  return (
    <div className="login-page">
      {/* ── Panel de marca ── */}
      <section className="login-brand">
        <div className="login-brand-top">
          <img src="/integra-logo-white-noclaim.svg" alt="INTEGRA" className="login-brand-logo" />
          <div className="login-env">
            <span className="login-env-dot" />
            PORTAL CORPORATIVO
          </div>
        </div>

        <div>
          <div className="login-eyebrow">Plataforma corporativa</div>
          <h1 className="login-h1">ERP y plataforma documental marítima y logística.</h1>
          <div className="login-rule" />
          <p className="login-lead">
            Un solo sistema para la operación, la administración y los documentos que la
            operación necesita emitir, firmar y archivar.
          </p>
          <div className="login-areas">
            {AREAS.map(a => <div key={a} className="login-area">{a}</div>)}
          </div>
        </div>

        <div className="login-brand-foot">
          <div className="login-marks">
            <img src="/PL.png" alt="PL Offshore" />
            <img src="/CS.png" alt="Clean Sea" />
            <img src="/logo-tm.png" alt="Terra Mare Services" />
          </div>
          <div className="login-meta">
            <div>Grupo Paraná Logística</div>
            <div>INTEGRA v2.0</div>
          </div>
        </div>
      </section>

      {/* ── Panel de acceso ── */}
      <section className="login-form-side">
        <div className="login-form-head">
          <div>
            <div className="i-label">Acceso general</div>
            <div style={{ font: "600 15px/1.4 var(--font-sans)", color: "var(--navy-integra)", marginTop: 4 }}>
              Portal corporativo del grupo
            </div>
          </div>
          <div className="login-tls">TLS 1.3 · CIFRADO</div>
        </div>

        <div className="login-form">
          <h2 className="login-form-title">Acceso al portal</h2>
          <p className="login-form-lead">Ingresá con tu cuenta corporativa. Solo personal autorizado.</p>

          {error && (
            <div className="alert" style={{ marginTop: 24 }} role="alert">
              <div className="alert-label">No se pudo ingresar</div>
              <div className="alert-text">{error}</div>
            </div>
          )}

          <div className="login-fields">
            <div className="field">
              <label htmlFor="login-email">Correo corporativo</label>
              <input
                id="login-email" type="email" value={email} autoFocus
                onChange={e => setEmail(e.target.value)} onKeyDown={handleKey}
                placeholder="usuario@terra-mare.com.ar" disabled={loading}
              />
            </div>
            <div className="field field-pass">
              <label htmlFor="login-pass">Contraseña</label>
              <input
                id="login-pass" type={show ? "text" : "password"} value={pass}
                onChange={e => setPass(e.target.value)} onKeyDown={handleKey}
                placeholder="••••••••" disabled={loading}
              />
              <button type="button" className="field-pass-toggle" onClick={() => setShow(!show)}>
                {show ? "Ocultar" : "Mostrar"}
              </button>
            </div>
          </div>

          <button
            className="btn btn-primary"
            style={{ marginTop: 24, height: 44, width: "100%", fontSize: 15 }}
            onClick={handleLogin}
            disabled={loading || !email || !pass}
          >
            {loading ? "Verificando credenciales…" : "Ingresar"}
          </button>

          <div className="login-form-foot">
            <div className="login-form-foot-rule" />
            <div className="login-form-foot-row">
              <span>Acceso restringido · Confidencial</span>
              <span className="powered">Powered by INTEGRA</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

/* ─── CARD DE EMPRESA ───────────────────────────────────────────────────────── */
function EmpresaCard({ empresa, tieneAcceso }) {
  const esProyectos = !!empresa.esProyectos;
  const puedeAbrir  = (tieneAcceso && empresa.activo && empresa.url) || (esProyectos && empresa.url);

  const handleClick = () => { if (puedeAbrir) window.location.href = empresa.url; };

  const estado = !tieneAcceso && !esProyectos ? "blocked"
               : empresa.activo               ? "open"
                                              : "soon";

  return (
    <div
      className={`empresa-card ${puedeAbrir ? "is-open" : estado === "blocked" ? "is-blocked" : ""}`}
      style={{ "--card-color": empresa.color }}
      onClick={handleClick}
      role={puedeAbrir ? "link" : undefined}
      tabIndex={puedeAbrir ? 0 : undefined}
      onKeyDown={e => { if (puedeAbrir && (e.key === "Enter" || e.key === " ")) handleClick(); }}
    >
      <div className="empresa-card-bar" />

      <div className="empresa-card-body">
        <div className="empresa-card-top">
          {empresa.logo
            ? <img src={empresa.logo} alt={empresa.nombre} className="empresa-logo" />
            : <span className="empresa-code">{empresa.codigo}</span>
          }
          {estado === "blocked" && <span className="badge badge-error">Sin acceso</span>}
          {estado === "open"    && <span className="badge badge-ok"><span className="badge-dot" />Activo</span>}
          {estado === "soon"    && <span className="badge badge-draft">Próximamente</span>}
        </div>

        <div className="empresa-nombre">{empresa.nombre}</div>
        <div className="empresa-desc">{empresa.descripcion}</div>

        <div className="empresa-modulos">
          {empresa.modulos.map(m => (
            <span key={m} className="empresa-modulo">{empresa.modulosLabel[m] || m}</span>
          ))}
        </div>
      </div>

      <div className="empresa-card-foot">
        {estado === "blocked"
          ? <span className="empresa-link-off">Acceso no autorizado</span>
          : puedeAbrir
            ? <span className="empresa-link">Ingresar al portal</span>
            : <span className="empresa-link-off">En desarrollo</span>
        }
        <span className="empresa-count">{empresa.modulos.length} módulos</span>
      </div>
    </div>
  );
}

/* ─── ADMINISTRACIÓN DE ACCESOS ─────────────────────────────────────────────── */
function AdminPanel({ onVolver }) {
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading]   = useState(true);
  const [saving, setSaving]     = useState({});
  const [saved, setSaved]       = useState({});
  const [errorGuardar, setErrorGuardar] = useState("");

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const { data, error } = await supabase.rpc("get_usuarios_con_roles");
        if (error) throw error;
        setUsuarios((data || []).map(r => ({
          ...r,
          empresas: r.empresas || [],
          modulos:  r.modulos  || [],
        })));
      } catch (e) {
        console.error("Error cargando usuarios:", e.message);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const toggleEmpresa = async (userId, empresaId, tieneAcceso) => {
    const user = usuarios.find(u => u.user_id === userId);
    if (!user) return;
    const nuevasEmpresas = tieneAcceso
      ? user.empresas.filter(e => e !== empresaId)
      : [...user.empresas, empresaId];
    await guardar(userId, nuevasEmpresas, user.modulos);
  };

  const toggleModulo = async (userId, moduloId, tieneAcceso) => {
    const user = usuarios.find(u => u.user_id === userId);
    if (!user) return;
    const nuevosModulos = tieneAcceso
      ? user.modulos.filter(m => m !== moduloId)
      : [...user.modulos, moduloId];
    await guardar(userId, user.empresas, nuevosModulos);
  };

  const guardar = async (userId, empresas, modulos) => {
    const anterior = usuarios.find(u => u.user_id === userId);
    setSaving(s => ({ ...s, [userId]: true }));
    setErrorGuardar("");
    setUsuarios(prev => prev.map(u => u.user_id === userId ? { ...u, empresas, modulos } : u));
    try {
      const { data: updateData, error: updateError } = await supabase
        .from("user_roles").update({ empresas, modulos })
        .eq("user_id", userId).select();
      if (updateError) throw updateError;
      if (!updateData || updateData.length === 0) {
        const { error: insertError } = await supabase
          .from("user_roles").insert({ user_id: userId, empresas, modulos });
        if (insertError) throw insertError;
      }
      setSaved(s => ({ ...s, [userId]: true }));
      setTimeout(() => setSaved(s => ({ ...s, [userId]: false })), 2000);
    } catch (e) {
      console.error("ERROR GUARDAR:", e);
      setErrorGuardar("No se pudo guardar el cambio. Recargá la página e intentá de nuevo.");
      if (anterior) {
        setUsuarios(prev => prev.map(u => u.user_id === userId
          ? { ...u, empresas: anterior.empresas, modulos: anterior.modulos }
          : u
        ));
      }
    } finally {
      setSaving(s => ({ ...s, [userId]: false }));
    }
  };

  const colWidths = ["280px", ...EMPRESAS.map(() => "minmax(0,1fr)")].join(" ");

  return (
    <div className="page">
      <div className="page-head">
        <div>
          <div className="page-eyebrow">Administración</div>
          <h1 className="page-title">Accesos por usuario</h1>
          <p className="page-lead">
            Habilitá empresas y módulos para cada cuenta. Los cambios se guardan al instante.
          </p>
          <div className="page-rule" />
        </div>
        <button className="btn btn-secondary" onClick={onVolver}>Volver al inicio</button>
      </div>

      {errorGuardar && (
        <div className="alert" style={{ marginBottom: 24 }} role="alert">
          <div className="alert-label">Error al guardar</div>
          <div className="alert-text">{errorGuardar}</div>
        </div>
      )}

      {loading ? (
        <div className="panel">
          <div className="empty-state"><div className="empty-state-text">Cargando usuarios…</div></div>
        </div>
      ) : usuarios.length === 0 ? (
        <div className="panel">
          <div className="empty-state">
            <div className="empty-state-text">Sin usuarios registrados. Creá la primera cuenta desde Supabase.</div>
          </div>
        </div>
      ) : (
        <div className="panel">
          <div className="matrix-head" style={{ gridTemplateColumns: colWidths }}>
            <div className="matrix-head-cell">Usuario</div>
            {EMPRESAS.map(emp => (
              <div key={emp.id} className="matrix-head-cell">{emp.nombre}</div>
            ))}
          </div>

          {usuarios.map(user => (
            <div key={user.user_id} className="matrix-row" style={{ gridTemplateColumns: colWidths }}>
              <div className="matrix-cell">
                <div className="matrix-user">{user.email}</div>
                <div className="matrix-user-id">{user.user_id.substring(0, 16)}…</div>
                {saving[user.user_id] && <span className="i-label">Guardando…</span>}
                {saved[user.user_id]  && <span className="badge badge-ok">Guardado</span>}
              </div>

              {EMPRESAS.map(emp => {
                const tieneEmpresa = user.empresas.includes(emp.id);
                return (
                  <div key={emp.id} className="matrix-cell">
                    <label className="access-toggle">
                      <span className="switch">
                        <input
                          type="checkbox" checked={tieneEmpresa}
                          onChange={() => toggleEmpresa(user.user_id, emp.id, tieneEmpresa)}
                        />
                        <span className="switch-track" />
                      </span>
                      <span className="access-label">{tieneEmpresa ? "Con acceso" : "Sin acceso"}</span>
                    </label>

                    {tieneEmpresa ? (
                      <div className="modulo-checks">
                        {emp.modulos.map(mod => {
                          const tieneModulo = user.modulos.includes(mod);
                          return (
                            <label key={mod} className="modulo-check">
                              <input
                                type="checkbox" checked={tieneModulo}
                                onChange={() => toggleModulo(user.user_id, mod, tieneModulo)}
                              />
                              <span>{emp.modulosLabel[mod] || mod}</span>
                            </label>
                          );
                        })}
                      </div>
                    ) : (
                      <span className="i-label">—</span>
                    )}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

/* ─── HOME ──────────────────────────────────────────────────────────────────── */
function HomePage({ user, empresasPermitidas, onLogout }) {
  const esAdmin = user.email === ADMIN_EMAIL;
  const [tab, setTab] = useState("home");

  const habilitadas = EMPRESAS.filter(e => e.esProyectos || empresasPermitidas.includes(e.id));

  return (
    <>
      <header className="topbar">
        <img src="/integra-logo-white-noclaim.svg" alt="INTEGRA" className="topbar-logo" />
        <div className="topbar-right">
          <span className="topbar-user">{user.email}</span>
          <span className="topbar-sep" />
          {esAdmin && (
            <button
              className={`btn btn-on-navy ${tab === "admin" ? "is-active" : ""}`}
              onClick={() => setTab(tab === "admin" ? "home" : "admin")}
            >
              Administración
            </button>
          )}
          <button className="btn btn-on-navy" onClick={onLogout}>Cerrar sesión</button>
        </div>
      </header>

      {tab === "admin" ? (
        <AdminPanel onVolver={() => setTab("home")} />
      ) : (
        <div className="page">
          <div className="page-head">
            <div>
              <div className="page-eyebrow">Portal corporativo</div>
              <h1 className="page-title">Empresas del grupo</h1>
              <p className="page-lead">
                Cada empresa opera su propia instancia de INTEGRA, con sus datos, su marca
                y sus permisos, sobre la misma base funcional.
              </p>
              <div className="page-rule" />
            </div>
          </div>

          <div className="section-label">
            Instancias
            <span className="section-count">{habilitadas.length} de {EMPRESAS.length} habilitadas</span>
          </div>

          <div className="empresas-grid">
            {EMPRESAS.map(e => (
              <EmpresaCard
                key={e.id}
                empresa={e}
                tieneAcceso={e.esProyectos || empresasPermitidas.includes(e.id)}
              />
            ))}
          </div>
        </div>
      )}

      <footer className="site-foot">
        <span>Grupo Paraná Logística · Plataforma documental marítima y logística · Confidencial</span>
        <span className="powered">Powered by INTEGRA · v2.0 — {new Date().getFullYear()}</span>
      </footer>
    </>
  );
}

/* ─── APP ───────────────────────────────────────────────────────────────────── */
export default function App() {
  const [session, setSession]                       = useState(null);
  const [empresasPermitidas, setEmpresasPermitidas] = useState([]);
  const [loading, setLoading]                       = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (session) loadRoles(session.user.id);
      else setLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (session) loadRoles(session.user.id);
      else { setEmpresasPermitidas([]); setLoading(false); }
    });

    return () => subscription.unsubscribe();
  }, []);

  const loadRoles = async (userId) => {
    try {
      const { data, error } = await supabase
        .from("user_roles").select("empresas").eq("user_id", userId).maybeSingle();
      if (error) console.error("Error cargando roles:", error.message);
      setEmpresasPermitidas(data?.empresas || []);
    } catch {
      setEmpresasPermitidas([]);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => { await supabase.auth.signOut(); };

  if (loading) return (
    <div className="loading-page">
      <div className="loading-inner">
        <img src="/integra-logo-white-noclaim.svg" alt="INTEGRA" />
        <div className="loading-text">Cargando</div>
      </div>
    </div>
  );

  return session
    ? <HomePage user={session.user} empresasPermitidas={empresasPermitidas} onLogout={handleLogout} />
    : <LoginPage />;
}
