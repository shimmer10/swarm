import React, { Component } from 'react';
import CanvasJSReact from '../../assets/canvasjs.react';
const CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

CanvasJS.addColorSet("customColorSet1",
	[
	"#cc3232", //red
	"#e7b416", //yellow
	"#2dc937", //green
	"#B2BFB6"
]); 
 
class DoughnutChart extends Component {
	render() {
		const options = {
			animationEnabled: true,
			colorSet: "customColorSet1",
			title: {
				text: "Session Aggregate"
			},
			subtitles: [{
				text: "Scrumblebees",
				verticalAlign: "center",
				fontSize: 24,
				dockInsidePlotArea: true
			}],
			data: [{
				type: "doughnut",
				showInLegend: true,
				indexLabel: "{name}: {y}",
				// yValueFormatString: "#,###'%'",
				yValueFormatString: "#,###",
				dataPoints: [
					{ name: "Blocked", y: 4 }, //red
					{ name: "At Risk", y: 6 }, //yellow
					{ name: "No Blockers", y: 12 }, //green
					{ name: "Unreported", y: 2 } //grey
				]
			}]
		}
		
		return (
		<div>
			{/* <h1>React Doughnut Chart</h1> */}
			<CanvasJSChart options = {options} 
				/* onRef={ref => this.chart = ref} */
			/>
			{/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
		</div>
		);
	}
}

export default DoughnutChart;