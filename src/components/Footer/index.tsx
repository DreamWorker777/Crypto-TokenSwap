import React from 'react'
import Brightness from '../../assets/images/brightness.svg'


export default function Footer(props: any) {
    return (
        <div className="footer-section absolute bottom-0 pb-2 w-full mt-4">
            <div className="flex flex-row flex-nowrap justify-between w-screen my-auto">  
            <div className="space-x-2 mx-auto">
            {/* <div className="inline-block  absolute left-5">
                <img src={Brightness} className="px-2 metric-semibold text-xsf font-medium	"/>
                
            </div> */}
            <div className="inline-block">
                <a href="https://www.shibatoken.com/" target="blank" className="px-2 metric-semibold text-xsf font-medium	" style={{ color: '#d5d5d5' }}>
                    Website
                </a>
            </div>
                <div className="inline-block">
                    <a href="https://t.me/shibainuthedogecoinkiller" target="blank" className="px-2 metric-semibold text-xsf font-medium	" style={{ color: '#d5d5d5' }}>
                        Telegram
                </a>
                </div>
                <div className="inline-block">
                    <a href="https://discord.com/invite/shibatoken" target="blank" className="px-2 metric-semibold text-xsf font-medium	" style={{ color: '#d5d5d5' }}>
                        Discord
                </a>
                </div>
                <div className="inline-block">
                    <a href="#" className="px-2 metric-semibold text-xsf font-medium	" style={{ color: '#d5d5d5' }}>
                        Governance
                </a>
                </div>
                <div className="inline-block">
                    <a href="https://twitter.com/shibtoken" target="blank" className="px-2 metric-semibold text-xsf font-medium	" style={{ color: '#d5d5d5' }}>
                        Twitter
                </a>
                </div>
                <div className="inline-block">
                    <a href="https://etherscan.io/token/0x95aD61b0a150d79219dCF64E1E6Cc01f0B64C4cE#balances" target="blank" className="px-2 metric-semibold text-xsf font-medium	" style={{ color: '#d5d5d5' }}>
                        Etherscan
                </a>
                </div>
                <div className="inline-block">
                    <a href="mailto:admin@shibatoken.com" target="blank" className="px-2 metric-semibold text-xsf font-medium	" style={{ color: '#d5d5d5' }}>
                        Contact Us
                </a>
                </div>
                <div className="inline-block absolute right-5">
                    <a href="#" className="px-2 text-xsf font-medium font-semibold" style={{ lineHeight: '0rem', color: '#fea31c' }}>
                        FAQ
                </a>
                </div>
            </div>
        </div>
        </div>


    )
}
