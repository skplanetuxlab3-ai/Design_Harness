import type { OrderHistoryCardProps, OrderStatus } from './OrderHistoryCard.types'

const STATUS_LABELS: Record<OrderStatus, string> = {
  completed: '구매 완료',
  cancelRequested: '구매 취소',
  cancelled: '취소 완료',
  refundRequested: '환불 신청',
  refunded: '환불 완료',
}

const STATUS_COLOR: Record<OrderStatus, string> = {
  completed: 'var(--color-brand-ocb-pink)',
  cancelRequested: 'var(--primitive-sp-pink)',
  refundRequested: 'var(--primitive-sp-pink)',
  cancelled: 'var(--primitive-blueblack-300)',
  refunded: 'var(--primitive-blueblack-300)',
}

function GotoChevron() {
  return (
    <svg width="9" height="10" viewBox="0 0 9 10" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M3 2L6 5L3 8"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export default function OrderHistoryCard({
  orderDate = 'OO.25(수)',
  status = 'completed',
  items = [],
  onOrderDetail,
  className,
}: OrderHistoryCardProps) {
  const displayItems = items.slice(0, 3)
  const itemCount = items.length

  return (
    <div
      className={className}
      style={{
        width: '100%',
        backgroundColor: 'var(--primitive-black-900)',
        borderRadius: '12px',
        overflow: 'hidden',
      }}
    >
      {/* Header */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '16px 16px 12px',
          borderBottom: `1px solid var(--primitive-black-800)`,
        }}
      >
        {/* Left: date + item count */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span
            style={{
              fontSize: '13px',
              fontWeight: 600,
              color: 'var(--primitive-blueblack-100)',
              lineHeight: '18px',
            }}
          >
            {orderDate}
          </span>
          <span
            style={{
              fontSize: '12px',
              color: 'var(--primitive-blueblack-300)',
              lineHeight: '18px',
            }}
          >
            {itemCount}개 상품
          </span>
          {/* Status badge */}
          <span
            style={{
              fontSize: '11px',
              fontWeight: 600,
              color: STATUS_COLOR[status],
              lineHeight: '16px',
            }}
          >
            {STATUS_LABELS[status]}
          </span>
        </div>

        {/* Right: 주문상세 link */}
        <button
          onClick={onOrderDetail}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '2px',
            background: 'none',
            border: 'none',
            padding: 0,
            cursor: 'pointer',
            color: 'var(--primitive-blueblack-300)',
          }}
        >
          <span style={{ fontSize: '12px', lineHeight: '18px' }}>주문상세</span>
          <GotoChevron />
        </button>
      </div>

      {/* Item rows */}
      <div>
        {displayItems.map((item, index) => (
          <div key={index}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '12px 16px',
              }}
            >
              {/* Thumbnail */}
              <div
                style={{
                  width: '56px',
                  height: '56px',
                  borderRadius: '8px',
                  overflow: 'hidden',
                  flexShrink: 0,
                  backgroundColor: 'var(--primitive-black-800)',
                }}
              >
                {item.imageUrl ? (
                  <img
                    src={item.imageUrl}
                    alt={item.name}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                ) : null}
              </div>

              {/* Info */}
              <div style={{ flex: 1, minWidth: 0 }}>
                <p
                  style={{
                    fontSize: '13px',
                    color: 'var(--primitive-blueblack-100)',
                    lineHeight: '18px',
                    marginBottom: '4px',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                  }}
                >
                  {item.name}
                </p>
                <p
                  style={{
                    fontSize: '13px',
                    fontWeight: 600,
                    color: 'var(--primitive-blueblack-100)',
                    lineHeight: '18px',
                  }}
                >
                  {item.price}
                  {item.quantity && item.quantity > 1 ? (
                    <span
                      style={{
                        fontSize: '12px',
                        fontWeight: 400,
                        color: 'var(--primitive-blueblack-300)',
                        marginLeft: '4px',
                      }}
                    >
                      × {item.quantity}
                    </span>
                  ) : null}
                </p>
              </div>
            </div>

            {/* Divider (not after last item) */}
            {index < displayItems.length - 1 && (
              <div
                style={{
                  height: '1px',
                  backgroundColor: 'var(--primitive-black-800)',
                  margin: '0 16px',
                }}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
