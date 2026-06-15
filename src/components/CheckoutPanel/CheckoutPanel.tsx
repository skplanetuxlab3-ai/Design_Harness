import { useState } from 'react'
import type { CheckoutPanelProps } from './CheckoutPanel.types'

function CloseIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M6 6L18 18M6 18L18 6"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  )
}

function CheckIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M3 8L6.5 11.5L13 5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function Divider() {
  return (
    <div
      style={{
        height: '1px',
        backgroundColor: 'var(--primitive-black-800)',
        margin: '0 20px',
      }}
    />
  )
}

export default function CheckoutPanel({
  state = 'default',
  productName = '상품명',
  imageUrl,
  quantity: initialQuantity = 1,
  originalPrice = '1,000,000원',
  finalPrice = '997,000원',
  pointDiscount = '-10,570P',
  pointBalance = '10,570P',
  phoneNumber = '010-***-1234',
  onClose,
  onQuantityChange,
  onPointCharge,
  onPointExchange,
  onAgreeAndPay,
  onViewOtherProducts,
  className,
}: CheckoutPanelProps) {
  const [qty, setQty] = useState(initialQuantity)
  const [agreed, setAgreed] = useState(false)

  function handleQtyChange(next: number) {
    if (next < 1) return
    setQty(next)
    onQuantityChange?.(next)
  }

  const primaryButtonStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '48px',
    borderRadius: '9999px',
    backgroundColor: 'var(--primitive-sp-black)',
    color: 'var(--primitive-black-900)',
    fontSize: '15px',
    fontWeight: 700,
    border: 'none',
    cursor: 'pointer',
  }

  const secondaryButtonStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    height: '48px',
    borderRadius: '9999px',
    backgroundColor: 'transparent',
    color: 'var(--primitive-sp-black)',
    fontSize: '15px',
    fontWeight: 600,
    border: `1.5px solid var(--primitive-sp-black)`,
    cursor: 'pointer',
  }

  return (
    <div
      className={className}
      style={{
        width: '100%',
        backgroundColor: 'var(--primitive-black-900)',
        borderRadius: '20px 20px 0 0',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Close button */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'flex-end',
          padding: '16px 16px 8px',
        }}
      >
        <button
          onClick={onClose}
          style={{
            background: 'none',
            border: 'none',
            padding: 0,
            cursor: 'pointer',
            color: 'var(--primitive-blueblack-300)',
          }}
        >
          <CloseIcon />
        </button>
      </div>

      {/* Product row */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 20px 16px',
          gap: '12px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flex: 1, minWidth: 0 }}>
          {imageUrl && (
            <div
              style={{
                width: '48px',
                height: '48px',
                borderRadius: '8px',
                overflow: 'hidden',
                flexShrink: 0,
                backgroundColor: 'var(--primitive-black-800)',
              }}
            >
              <img src={imageUrl} alt={productName} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
          )}
          <span
            style={{
              fontSize: '14px',
              fontWeight: 600,
              color: 'var(--primitive-blueblack-100)',
              lineHeight: '20px',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
            }}
          >
            {productName}
          </span>
        </div>

        {/* Quantity control */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0',
            border: `1px solid var(--primitive-black-800)`,
            borderRadius: '8px',
            overflow: 'hidden',
            flexShrink: 0,
          }}
        >
          <button
            onClick={() => handleQtyChange(qty - 1)}
            style={{
              width: '32px',
              height: '32px',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              fontSize: '18px',
              color: 'var(--primitive-blueblack-200)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            −
          </button>
          <span
            style={{
              width: '32px',
              textAlign: 'center',
              fontSize: '14px',
              fontWeight: 600,
              color: 'var(--primitive-blueblack-100)',
            }}
          >
            {qty}
          </span>
          <button
            onClick={() => handleQtyChange(qty + 1)}
            style={{
              width: '32px',
              height: '32px',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              fontSize: '18px',
              color: 'var(--primitive-blueblack-200)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            +
          </button>
        </div>
      </div>

      <Divider />

      {/* Price section */}
      <div style={{ padding: '16px 20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '4px' }}>
          <span style={{ fontSize: '13px', color: 'var(--primitive-blueblack-300)' }}>정가</span>
          <span
            style={{
              fontSize: '13px',
              color: 'var(--primitive-blueblack-400)',
              textDecoration: 'line-through',
            }}
          >
            {originalPrice}
          </span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span style={{ fontSize: '15px', fontWeight: 700, color: 'var(--primitive-blueblack-100)' }}>결제금액</span>
          <span style={{ fontSize: '18px', fontWeight: 700, color: 'var(--primitive-sp-black)' }}>
            {finalPrice}
          </span>
        </div>
      </div>

      <Divider />

      {/* Point section */}
      <div style={{ padding: '16px 20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
          <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--primitive-blueblack-100)' }}>
            OCB 포인트 사용
          </span>
          <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--color-brand-ocb-pink)' }}>
            {pointDiscount}
          </span>
        </div>

        {state !== 'default' && (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '10px 12px',
              backgroundColor: 'var(--primitive-black-800)',
              borderRadius: '8px',
            }}
          >
            <div>
              <p style={{ fontSize: '11px', color: 'var(--primitive-blueblack-300)', marginBottom: '2px' }}>
                보유 포인트
              </p>
              <p style={{ fontSize: '14px', fontWeight: 700, color: 'var(--primitive-blueblack-100)' }}>
                {pointBalance}
              </p>
            </div>
            {state === 'pointLow' && (
              <span
                style={{
                  fontSize: '11px',
                  color: 'var(--primitive-sp-pink)',
                  fontWeight: 600,
                }}
              >
                포인트가 부족합니다
              </span>
            )}
          </div>
        )}
      </div>

      <Divider />

      {/* Phone number + terms */}
      <div style={{ padding: '16px 20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
          <span style={{ fontSize: '13px', color: 'var(--primitive-blueblack-300)' }}>휴대폰번호</span>
          <span style={{ fontSize: '13px', color: 'var(--primitive-blueblack-100)' }}>{phoneNumber}</span>
        </div>

        {/* Agreement checkbox */}
        <button
          onClick={() => setAgreed(!agreed)}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            background: 'none',
            border: 'none',
            padding: 0,
            cursor: 'pointer',
            width: '100%',
          }}
        >
          <div
            style={{
              width: '20px',
              height: '20px',
              borderRadius: '4px',
              backgroundColor: agreed ? 'var(--primitive-sp-black)' : 'transparent',
              border: `1.5px solid ${agreed ? 'var(--primitive-sp-black)' : 'var(--primitive-blueblack-700)'}`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
              color: 'var(--primitive-black-900)',
            }}
          >
            {agreed && <CheckIcon />}
          </div>
          <span style={{ fontSize: '13px', color: 'var(--primitive-blueblack-200)', textAlign: 'left' }}>
            구매조건 및 개인정보 처리방침에 동의합니다
          </span>
        </button>
      </div>

      {/* Action buttons */}
      <div style={{ padding: '8px 20px 32px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {state === 'default' && (
          <button style={primaryButtonStyle} onClick={onAgreeAndPay}>
            동의하고 결제하기
          </button>
        )}

        {state === 'pointFull' && (
          <>
            <div style={{ display: 'flex', gap: '8px' }}>
              <button style={secondaryButtonStyle} onClick={onPointCharge}>
                포인트 충전
              </button>
              <button style={secondaryButtonStyle} onClick={onPointExchange}>
                포인트 교환
              </button>
            </div>
            <button style={primaryButtonStyle} onClick={onAgreeAndPay}>
              동의하고 결제하기
            </button>
          </>
        )}

        {state === 'pointLow' && (
          <>
            <div style={{ display: 'flex', gap: '8px' }}>
              <button style={secondaryButtonStyle} onClick={onViewOtherProducts}>
                다른 상품 보기
              </button>
              <button style={secondaryButtonStyle} onClick={onPointExchange}>
                포인트 교환
              </button>
            </div>
            <button style={primaryButtonStyle} onClick={onPointExchange}>
              포인트 교환
            </button>
            <button
              onClick={onViewOtherProducts}
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                fontSize: '13px',
                color: 'var(--primitive-blueblack-300)',
                textDecoration: 'underline',
                padding: '4px 0',
              }}
            >
              다른 상품 보기
            </button>
          </>
        )}
      </div>
    </div>
  )
}
