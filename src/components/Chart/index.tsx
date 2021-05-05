import React from 'react';
import ReactECharts from 'echarts-for-react';





function Chart(props: any ) {
    
    console.log('props found in charts file', props)
    
    return (
        <>
            <ReactECharts
                option={props.options}
                notMerge={true}
                lazyUpdate={true}
                theme={"theme_name"}
            />
            
        </>
    )
}

export default Chart;