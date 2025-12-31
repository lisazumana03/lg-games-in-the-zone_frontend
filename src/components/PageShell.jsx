
function PageShell({ title, subtitle, maxWidth = '880px', children, footer }) {
  return (
    <div className="page-shell">
      <div className="page-overlay" />
      <div className="page-card" style={{ maxWidth }}>
        {(title || subtitle) && (
          <div className="page-heading">
            {title && <h2>{title}</h2>}
            {subtitle && <p>{subtitle}</p>}
          </div>
        )}
        {children}
        {footer}
      </div>
    </div>
  );
}

export default PageShell;
