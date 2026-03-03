import { useParams } from "react-router-dom";

// --- Mock Novel Data (replace with real API fetch using id) ---
const mockNovels: Record<
  string,
  {
    id: number;
    title: string;
    author: string;
    genres: string[];
    tags: string[];
    published: string;
    lastUpdated: string;
    words: number;
    synopsis: string;
    content: string;
  }
> = {
  "1": {
    id: 1,
    title: "The Stellar Swordmaster",
    author: "StarForgedAuthor",
    genres: ["Action", "Fantasy", "Manhwa"],
    tags: [
      "Reincarnation",
      "Martial Arts",
      "Adventure",
      "Power Fantasy",
      "Magic System",
    ],
    published: "2024-01-15",
    lastUpdated: "02-28-2026",
    words: 184320,
    synopsis:
      "A legendary swordmaster reincarnates and rises through the ranks of a world governed by magic and steel. Armed with the memories of a thousand battles and a will that cannot be broken, Kael Dravin must claw his way back to the top — but this time, the stakes are far greater than glory.",
    content: `Chapter 1: The Second Dawn

The sword fell.

It always fell the same way — a clean arc, the kind only a master could execute, splitting the air with a whisper before finding its mark. Kael had seen it a thousand times. Had done it a thousand times.

And then the darkness.

He expected nothing after. The great swordmasters of old spoke of an endless void, a silence so complete it became its own kind of peace. What he did not expect was the cold — biting, furious cold — and the sound of a woman screaming somewhere nearby.

He opened his eyes.

The ceiling above him was wood, rough-hewn and waterlogged. A child's ceiling. He raised his hand and found it small, trembling, the hand of someone who had never once held a blade.

Kael Dravin, the Stellar Swordmaster, the man who had felled three warlords before the age of forty, lay in the body of a boy no older than ten — and began to laugh.

It was not a kind laugh. It was the laugh of a man who had seen too much to be surprised by anything, and yet here he was: surprised.

"You're awake!" A girl's face appeared above him, round-cheeked and wide-eyed, her hair the color of straw. "Mother said you wouldn't wake up. She said the fever took you."

"The fever," Kael repeated. His voice came out thin and reedy. He hated it immediately.

"Yes. You were very sick." She tilted her head. "You sound different."

"I feel different." He sat up slowly, testing the body's limits. Weak. Undertrained. Lungs too small. But the bones were good — light and dense, the kind that responded well to conditioning. He had worked with worse.

He swung his legs over the side of the bed and stood.

The girl stared.

"Where," Kael said, "is the nearest place I can find a sword?"`,
  },
};

// --- Styles ---
const s = {
  page: {
    backgroundColor: "#111111",
    minHeight: "100vh",
    color: "#ffffff",
  } as React.CSSProperties,
  inner: {
    maxWidth: "900px",
    margin: "0 auto",
    padding: "40px 40px",
  } as React.CSSProperties,

  // --- Metadata Box ---
  metaBox: {
    backgroundColor: "#161616",
    border: "1px solid #222222",
    borderRadius: "12px",
    padding: "24px 28px",
    marginBottom: "40px",
  } as React.CSSProperties,
  metaRow: {
    display: "flex",
    gap: "24px",
    paddingBottom: "10px",
    paddingTop: "10px",
    borderBottom: "1px solid #1e1e1e",
    alignItems: "flex-start",
  } as React.CSSProperties,
  metaRowLast: {
    display: "flex",
    gap: "24px",
    paddingTop: "10px",
    alignItems: "flex-start",
  } as React.CSSProperties,
  metaLabel: {
    fontSize: "13px",
    color: "#6b7280",
    minWidth: "120px",
    flexShrink: 0,
    paddingTop: "2px",
  } as React.CSSProperties,
  metaLabelBold: {
    fontSize: "13px",
    color: "#9ca3af",
    fontWeight: "700",
    minWidth: "120px",
    flexShrink: 0,
    paddingTop: "2px",
    textDecoration: "underline",
  } as React.CSSProperties,
  metaValue: {
    fontSize: "13px",
    color: "#d1d5db",
    lineHeight: "1.6",
    flexWrap: "wrap" as const,
    display: "flex",
    gap: "6px",
    alignItems: "center",
  } as React.CSSProperties,
  metaValueBold: {
    fontSize: "13px",
    color: "#ffffff",
    fontWeight: "700",
    lineHeight: "1.6",
    flexWrap: "wrap" as const,
    display: "flex",
    gap: "6px",
    alignItems: "center",
  } as React.CSSProperties,
  metaLink: {
    color: "#d1d5db",
    textDecoration: "underline",
    cursor: "pointer",
    fontSize: "13px",
  } as React.CSSProperties,
  metaStatRow: {
    fontSize: "12px",
    color: "#6b7280",
    display: "flex",
    gap: "20px",
    flexWrap: "wrap" as const,
  } as React.CSSProperties,
  GenreBadge: {
    fontSize: "11px",
    padding: "2px 10px",
    borderRadius: "9999px",
    backgroundColor: "#252525",
    border: "1px solid #383838",
    color: "#d1d5db",
    fontWeight: "500",
  } as React.CSSProperties,

  // --- Title block ---
  title: {
    fontSize: "28px",
    fontWeight: "800",
    color: "#ffffff",
    lineHeight: "1.3",
    marginBottom: "6px",
  } as React.CSSProperties,
  author: {
    fontSize: "14px",
    color: "#6b7280",
    marginBottom: "24px",
  } as React.CSSProperties,
  authorLink: {
    color: "#60a5fa",
    textDecoration: "underline",
    cursor: "pointer",
  } as React.CSSProperties,

  // --- Synopsis block ---
  synopsisBox: {
    backgroundColor: "#161616",
    border: "1px solid #222222",
    borderRadius: "12px",
    padding: "20px 24px",
    marginBottom: "40px",
  } as React.CSSProperties,
  synopsisLabel: {
    fontSize: "13px",
    fontWeight: "700",
    color: "#9ca3af",
    textDecoration: "underline",
    marginBottom: "12px",
    display: "block",
  } as React.CSSProperties,
  synopsisText: {
    fontSize: "14px",
    color: "#d1d5db",
    lineHeight: "1.8",
  } as React.CSSProperties,

  // --- Content block ---
  contentBox: {
    backgroundColor: "#161616",
    border: "1px solid #222222",
    borderRadius: "12px",
    padding: "32px 36px",
  } as React.CSSProperties,
  contentLabel: {
    fontSize: "13px",
    fontWeight: "700",
    color: "#9ca3af",
    textDecoration: "underline",
    marginBottom: "24px",
    display: "block",
  } as React.CSSProperties,
  contentText: {
    fontSize: "15px",
    color: "#e5e7eb",
    lineHeight: "2",
    whiteSpace: "pre-wrap" as const,
  } as React.CSSProperties,
};

// --- Helper ---
const MetaRow = ({
  label,
  bold,
  isLast,
  children,
}: {
  label: string;
  bold?: boolean;
  isLast?: boolean;
  children: React.ReactNode;
}) => (
  <div style={isLast ? s.metaRowLast : s.metaRow}>
    <span style={bold ? s.metaLabelBold : s.metaLabel}>{label}:</span>
    <div style={bold ? s.metaValueBold : s.metaValue}>{children}</div>
  </div>
);

// --- Main Page ---
export const ReadingPage = () => {
  const { id } = useParams<{ id: string }>();
  const novel = id ? mockNovels[id] : null;

  if (!novel) {
    return (
      <div style={s.page}>
        <div style={s.inner}>
          <p style={{ color: "#6b7280" }}>Novel not found.</p>
        </div>
      </div>
    );
  }

  return (
    <div style={s.page}>
      <div style={s.inner}>
        {/* Title & Author */}
        <h1 style={s.title}>{novel.title}</h1>
        <p style={s.author}>
          by <span style={s.authorLink}>{novel.author}</span>
        </p>

        {/* Metadata Box */}
        <div style={s.metaBox}>
          <MetaRow label="Genres">
            {novel.genres.map((g) => (
              <span key={g} style={s.GenreBadge}>
                {g}
              </span>
            ))}
          </MetaRow>
          <MetaRow label="Additional Tags">
            {novel.tags.map((t, i) => (
              <span key={t}>
                <span style={s.metaLink}>{t}</span>
                {i < novel.tags.length - 1 && (
                  <span style={{ color: "#4b5563" }}>,</span>
                )}
              </span>
            ))}
          </MetaRow>
          <MetaRow label="Stats" isLast>
            <div style={s.metaStatRow}>
              <span>Published: {novel.published}</span>
              <span>Updated: {novel.lastUpdated}</span>
              <span>Words: {novel.words.toLocaleString()}</span>
            </div>
          </MetaRow>
        </div>

        {/* Synopsis */}
        <div style={s.synopsisBox}>
          <span style={s.synopsisLabel}>Summary:</span>
          <p style={s.synopsisText}>{novel.synopsis}</p>
        </div>

        {/* Content */}
        <div style={s.contentBox}>
          <span style={s.contentLabel}>Chapter Content:</span>
          <p style={s.contentText}>{novel.content}</p>
        </div>
      </div>
    </div>
  );
};
export const BrowsePage = () => {
  return <ReadingPage />;
};
