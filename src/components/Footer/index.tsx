import React from 'react'
import Brightness from '../../assets/images/brightness.svg'


export default function Footer(props: any) {
    return (
        <div className="footer-section absolute bottom-0 w-full">
            <div className="flex flex-row flex-nowrap justify-between w-screen container my-auto">  
            <div className="space-x-2 mx-auto">
            <div className="inline-block  absolute left-5">
                <img src={Brightness} className="px-2 metric-semibold text-xl font-medium	"/>
                
            </div>
            <div className="inline-block">
                <a href="#" className="px-2 metric-semibold text-xl font-medium	" style={{ color: '#d5d5d5' }}>
                    Website
                </a>
            </div>
                <div className="inline-block">
                    <a href="#" className="px-2 metric-semibold text-xl font-medium	" style={{ color: '#d5d5d5' }}>
                        Telegram
                </a>
                </div>
                <div className="inline-block">
                    <a href="#" className="px-2 metric-semibold text-xl font-medium	" style={{ color: '#d5d5d5' }}>
                        Discord
                </a>
                </div>
                <div className="inline-block">
                    <a href="#" className="px-2 metric-semibold text-xl font-medium	" style={{ color: '#d5d5d5' }}>
                        Governance
                </a>
                </div>
                <div className="inline-block">
                    <a href="#" className="px-2 metric-semibold text-xl font-medium	" style={{ color: '#d5d5d5' }}>
                        Twitter
                </a>
                </div>
                <div className="inline-block">
                    <a href="#" className="px-2 metric-semibold text-xl font-medium	" style={{ color: '#d5d5d5' }}>
                        Etherscan
                </a>
                </div>
                <div className="inline-block">
                    <a href="#" className="px-2 metric-semibold text-xl font-medium	" style={{ color: '#d5d5d5' }}>
                        Contact Us
                </a>
                </div>
                <div className="inline-block absolute right-5">
                    <a href="#" className="px-2 text-xl font-medium	 font-semibold" style={{ lineHeight: '0rem', color: '#fea31c' }}>
                        FAQ
                </a>
                </div>
            </div>
        </div>
        </div>


    )
}
