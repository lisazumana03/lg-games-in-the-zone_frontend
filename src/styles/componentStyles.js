// Reusable component styles for consistent theming across all pages

export const commonStyles = {
  // Container styles
  pageContainer: {
    minHeight: '100vh',
    padding: '2rem',
    backgroundColor: '#f5f5f5'
  },

  pageContainerMobile: {
    minHeight: '100vh',
    padding: '1rem',
    backgroundColor: '#f5f5f5'
  },

  // Background with overlay
  heroContainer: {
    minHeight: '100vh',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '2rem'
  },

  heroOverlay: {
    position: 'absolute',
    inset: 0,
    background: 'linear-gradient(180deg, rgba(44,20,5,0.55), rgba(70,34,8,0.45) 40%, rgba(255,241,224,0.06))',
    pointerEvents: 'none'
  },

  // Card styles
  card: {
    position: 'relative',
    zIndex: 2,
    width: '100%',
    maxWidth: '720px',
    borderRadius: '1rem',
    background: 'rgba(255,255,255,0.03)',
    border: '1px solid rgba(255,255,255,0.06)',
    boxShadow: '0 12px 40px rgba(0,0,0,0.6)',
    backdropFilter: 'blur(6px)',
    padding: '2rem'
  },

  cardSmall: {
    position: 'relative',
    zIndex: 2,
    width: '100%',
    maxWidth: '500px',
    borderRadius: '1rem',
    background: 'rgba(255,255,255,0.03)',
    border: '1px solid rgba(255,255,255,0.06)',
    boxShadow: '0 12px 40px rgba(0,0,0,0.6)',
    backdropFilter: 'blur(6px)',
    padding: '1.5rem'
  },

  // Table container
  tableContainer: {
    backgroundColor: '#ffffff',
    borderRadius: '0.75rem',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    overflow: 'hidden',
    marginBottom: '2rem'
  },

  tableHeader: {
    backgroundColor: '#F6C85F',
    padding: '1rem',
    borderBottom: '1px solid #e0e0e0'
  },

  tableHeaderCell: {
    textAlign: 'left',
    padding: '1rem',
    borderRight: '1px solid #e0e0e0',
    fontWeight: '600',
    color: '#2b1f10'
  },

  tableCell: {
    padding: '1rem',
    borderRight: '1px solid #e0e0e0'
  },

  tableRow: {
    borderBottom: '1px solid #e0e0e0'
  },

  // Buttons
  primaryButton: {
    background: 'linear-gradient(90deg, #7a4b15 0%, #c17b2a 100%)',
    color: '#fff',
    border: '1px solid rgba(0,0,0,0.15)',
    padding: '0.75rem 1.5rem',
    borderRadius: '0.5rem',
    cursor: 'pointer',
    fontSize: '0.95rem',
    fontWeight: '500',
    transition: 'all 0.3s ease'
  },

  accentButton: {
    background: 'linear-gradient(90deg, #ffd89b 0%, #c17b2a 100%)',
    color: '#2b1f10',
    border: '1px solid rgba(0,0,0,0.06)',
    padding: '0.75rem 1.5rem',
    borderRadius: '0.5rem',
    cursor: 'pointer',
    fontSize: '0.95rem',
    fontWeight: '500',
    transition: 'all 0.3s ease'
  },

  dangerButton: {
    background: 'linear-gradient(90deg, #d32f2f 0%, #b71c1c 100%)',
    color: '#fff',
    border: '1px solid rgba(0,0,0,0.15)',
    padding: '0.75rem 1.5rem',
    borderRadius: '0.5rem',
    cursor: 'pointer',
    fontSize: '0.95rem',
    fontWeight: '500',
    transition: 'all 0.3s ease'
  },

  secondaryButton: {
    background: '#6b5a3a',
    color: '#fff',
    border: '1px solid #5a4a2a',
    padding: '0.75rem 1.5rem',
    borderRadius: '0.5rem',
    cursor: 'pointer',
    fontSize: '0.95rem',
    fontWeight: '500',
    transition: 'all 0.3s ease'
  },

  smallButton: {
    padding: '0.35rem 0.75rem',
    fontSize: '0.85rem'
  },

  largeButton: {
    padding: '1rem 2rem',
    fontSize: '1rem'
  },

  // Form elements
  formGroup: {
    marginBottom: '1.5rem'
  },

  label: {
    display: 'block',
    marginBottom: '0.5rem',
    fontWeight: '500',
    color: '#2b1f10',
    fontSize: '0.95rem'
  },

  input: {
    width: '100%',
    padding: '0.75rem',
    border: '1px solid #e0e0e0',
    borderRadius: '0.5rem',
    fontSize: '0.95rem',
    color: '#2b1f10',
    backgroundColor: '#ffffff',
    marginBottom: '0.5rem',
    transition: 'all 0.2s ease'
  },

  textarea: {
    width: '100%',
    padding: '0.75rem',
    border: '1px solid #e0e0e0',
    borderRadius: '0.5rem',
    fontSize: '0.95rem',
    color: '#2b1f10',
    backgroundColor: '#ffffff',
    marginBottom: '0.5rem',
    minHeight: '120px',
    resize: 'vertical',
    transition: 'all 0.2s ease'
  },

  select: {
    width: '100%',
    padding: '0.75rem',
    border: '1px solid #e0e0e0',
    borderRadius: '0.5rem',
    fontSize: '0.95rem',
    color: '#2b1f10',
    backgroundColor: '#ffffff',
    marginBottom: '0.5rem',
    transition: 'all 0.2s ease'
  },

  // Alert/Message
  alertError: {
    color: '#d32f2f',
    marginBottom: '1rem',
    padding: '1rem',
    backgroundColor: '#ffebee',
    borderRadius: '0.5rem',
    borderLeft: '4px solid #d32f2f'
  },

  alertSuccess: {
    color: '#4caf50',
    marginBottom: '1rem',
    padding: '1rem',
    backgroundColor: '#e8f5e9',
    borderRadius: '0.5rem',
    borderLeft: '4px solid #4caf50'
  },

  alertWarning: {
    color: '#f57c00',
    marginBottom: '1rem',
    padding: '1rem',
    backgroundColor: '#fff3e0',
    borderRadius: '0.5rem',
    borderLeft: '4px solid #f57c00'
  },

  // Spacing utilities
  marginBottom: {
    0: { marginBottom: '0' },
    1: { marginBottom: '0.5rem' },
    2: { marginBottom: '1rem' },
    3: { marginBottom: '1.5rem' },
    4: { marginBottom: '2rem' }
  },

  marginTop: {
    0: { marginTop: '0' },
    1: { marginTop: '0.5rem' },
    2: { marginTop: '1rem' },
    3: { marginTop: '1.5rem' },
    4: { marginTop: '2rem' }
  },

  padding: {
    1: { padding: '0.5rem' },
    2: { padding: '1rem' },
    3: { padding: '1.5rem' },
    4: { padding: '2rem' }
  },

  // Flex utilities
  flexCenter: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },

  flexBetween: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between'
  },

  flexColumn: {
    display: 'flex',
    flexDirection: 'column'
  },

  flexGap: (size = '1rem') => ({
    display: 'flex',
    gap: size
  }),

  // Text utilities
  textCenter: {
    textAlign: 'center'
  },

  textMuted: {
    color: '#6b5a3a'
  },

  // Loading state
  loading: {
    textAlign: 'center',
    padding: '2rem',
    color: '#6b5a3a',
    fontStyle: 'italic'
  }
};

export default commonStyles;
