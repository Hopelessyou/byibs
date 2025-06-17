import React, { useState } from "react";

// 트리 노드 데이터 예시
const nodes = [
  { id: "police", label: "경찰 수사", x: 300, y: 60, color: "#2563eb", icon: "👮", description: "경찰이 사건을 조사하는 단계입니다." },
  { id: "prosecution", label: "검찰 송치", x: 300, y: 180, color: "#22c55e", icon: "⚖️", description: "경찰 수사 후 검찰로 사건이 넘어가는 단계입니다." },
  { id: "court", label: "법원", x: 300, y: 300, color: "#f59e42", icon: "🏛️", description: "검찰이 기소한 사건이 법원에서 재판을 받는 단계입니다." },
  { id: "not_sent", label: "불송치", x: 120, y: 180, color: "#e11d48", icon: "❌", description: "혐의가 인정되지 않아 사건이 종결되는 단계입니다." },
  { id: "suspend", label: "수사중지", x: 480, y: 180, color: "#a21caf", icon: "⏸️", description: "피의자 소재불명 등으로 수사가 중지되는 단계입니다." },
];

const links = [
  { from: "police", to: "prosecution" },
  { from: "prosecution", to: "court" },
  { from: "police", to: "not_sent" },
  { from: "police", to: "suspend" },
];

export default function InvestigationTreeSVG() {
  const [active, setActive] = useState<string | null>(null);

  // 노드 id로 좌표 찾기
  const getNode = (id: string) => nodes.find((n) => n.id === id)!;

  return (
    <div style={{ width: "100%", overflowX: "auto" }}>
      <svg width={600} height={400} style={{ background: "#f8fafc" }}>
        {/* 브랜치(곡선) */}
        {links.map((link, i) => {
          const from = getNode(link.from);
          const to = getNode(link.to);
          // Bezier 곡선 제어점 계산
          const c1x = from.x;
          const c1y = (from.y + to.y) / 2;
          const c2x = to.x;
          const c2y = (from.y + to.y) / 2;
          return (
            <path
              key={i}
              d={`M${from.x},${from.y + 30} C${c1x},${c1y} ${c2x},${c2y} ${to.x},${to.y - 30}`}
              stroke="#a3a3a3"
              strokeWidth={4}
              fill="none"
              style={{
                filter: "drop-shadow(0 1px 2px #e5e7eb)",
                opacity: active && (active === link.from || active === link.to) ? 1 : 0.5,
                transition: "opacity 0.2s",
              }}
            />
          );
        })}

        {/* 노드 */}
        {nodes.map((node) => (
          <g
            key={node.id}
            onMouseEnter={() => setActive(node.id)}
            onMouseLeave={() => setActive(null)}
            onClick={() => setActive(node.id)}
            style={{ cursor: "pointer" }}
          >
            {/* 그림자 */}
            <ellipse
              cx={node.x}
              cy={node.y + 8}
              rx={60}
              ry={18}
              fill="#000"
              opacity={0.08}
            />
            {/* pill 노드 */}
            <rect
              x={node.x - 60}
              y={node.y - 30}
              rx={30}
              ry={30}
              width={120}
              height={60}
              fill={active === node.id ? node.color : "#fff"}
              stroke={node.color}
              strokeWidth={3}
              style={{
                filter: active === node.id
                  ? `drop-shadow(0 4px 12px ${node.color}55)`
                  : "drop-shadow(0 2px 6px #94a3b833)",
                transition: "all 0.2s",
              }}
            />
            {/* 아이콘 */}
            <text
              x={node.x - 38}
              y={node.y + 8}
              fontSize={28}
              textAnchor="middle"
              alignmentBaseline="middle"
            >
              {node.icon}
            </text>
            {/* 라벨 */}
            <text
              x={node.x + 10}
              y={node.y + 8}
              fontSize={18}
              fontWeight="bold"
              fill={active === node.id ? "#fff" : node.color}
              textAnchor="start"
              alignmentBaseline="middle"
              style={{ transition: "all 0.2s" }}
            >
              {node.label}
            </text>
            {/* 팝업 */}
            {active === node.id && (
              <foreignObject x={node.x + 70} y={node.y - 40} width={220} height={110}>
                <div
                  style={{
                    background: "#fff",
                    border: `2px solid ${node.color}`,
                    borderRadius: 16,
                    boxShadow: "0 4px 16px #0002",
                    padding: 16,
                    fontSize: 14,
                    color: "#222",
                    minWidth: 180,
                  }}
                >
                  <b>{node.label}</b>
                  <div style={{ marginTop: 8 }}>{node.description}</div>
                </div>
              </foreignObject>
            )}
          </g>
        ))}
      </svg>
    </div>
  );
} 