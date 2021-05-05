import React from 'react'

export default function Footer(props: any) {
    return (
        <div className="row mb-2" style={{ width: '100%', flexShrink: 0, color: '#d5d5d5' }}>
            <div className="col-3 p-1 col-lg-1 offset-lg-2">
                <a href="#" className="px-2 metric-semibold" style={{ color: '#d5d5d5' }}>
                    Website
                </a>
            </div>
            <div className="col-3 p-1 col-lg-1">
                <a href="#" className="px-2 metric-semibold" style={{ color: '#d5d5d5' }}>
                    Telegram
                </a>
            </div>
            <div className="col-3 p-1 col-lg-1">
                <a href="#" className="px-2 metric-semibold" style={{ color: '#d5d5d5' }}>
                    Discord
                </a>
            </div>
            <div className="col-3 p-1 col-lg-1">
                <a href="#" className="px-2 metric-semibold" style={{ color: '#d5d5d5' }}>
                    Governance
                </a>
            </div>
            <div className="col-3 p-1 col-lg-1">
                <a href="#" className="px-2 metric-semibold" style={{ color: '#d5d5d5' }}>
                    Twitter
                </a>
            </div>
            <div className="col-3 p-1 col-lg-1">
                <a href="#" className="px-2 metric-semibold" style={{ color: '#d5d5d5' }}>
                    Etherscan
                </a>
            </div>
            <div className="col-3 p-1 col-lg-1">
                <a href="#" className="px-2 metric-semibold" style={{ color: '#d5d5d5' }}>
                    Contact
                </a>
            </div>
            <div className="col-3 p-1 offset-lg-2 col-lg-1">
                <a href="#" className="px-2 metric-semibold" style={{ lineHeight: '2rem', color: '#d5d5d5' }}>
                    FAQ
                </a>
            </div>
        </div>
    )
}
