import React from 'react'

export default function Footer(props: any) {
    return (
        <div className="row mb-2" style={{ width: '100%', flexShrink: 0  }}>
            <div className="col-3 p-1 col-lg-1 offset-lg-2">
                <a href="#" className="px-2 metric-semibold">
                    Website
                </a>
            </div>
            <div className="col-3 p-1 col-lg-1">
                <a href="#" className="px-2 metric-semibold">
                    Telegram
                </a>
            </div>
            <div className="col-3 p-1 col-lg-1">
                <a href="#" className="px-2 metric-semibold">
                    Discord
                </a>
            </div>
            <div className="col-3 p-1 col-lg-1">
                <a href="#" className="px-2 metric-semibold">
                    Governance
                </a>
            </div>
            <div className="col-3 p-1 col-lg-1">
                <a href="#" className="px-2 metric-semibold">
                    Twitter
                </a>
            </div>
            <div className="col-3 p-1 col-lg-1">
                <a href="#" className="px-2 metric-semibold">
                    Etherscan
                </a>
            </div>
            <div className="col-3 p-1 col-lg-1">
                <a href="#" className="px-2 metric-semibold">
                    Contact
                </a>
            </div>
            <div className="col-3 p-1 offset-lg-2 col-lg-1">
                <a href="#" className="px-2 metric-semibold" style={{ lineHeight: '2rem' }}>
                    FAQ
                </a>
            </div>
        </div>
    )
}
