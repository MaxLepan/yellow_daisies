function onGenerateGraph() {


const img = new Image();
	img.src = '../assets/img/';
	img.onload = function() {
	    const ctx = document.getElementById('myChart').getContext('2d');
	    const fillPattern = ctx.createPattern(img, 'repeat');
	    var xValues = [1990,2000,2010,2020];
		var myChart = new Chart("myChart", {
		  type: "line",
		  borderColor:"#4F2F2F",
		  color:"#4F2F2F",
		  data: {
	    	labels: xValues,
	    	datasets: [{
	      		data: [860,1140,1060,1060,1070,1110,1330,2210,7830,2478],
	      		borderColor: "#EEAAFF",
	      		fill: false,
	      		pointRadius: 20,
	      		pointBackgroundColor:fillPattern
		    	},{
		      		data: [1600,1700,1700,1900,2000,2700,4000,5000,6000,7000],
		      		borderColor: "#F8CCD0",
		      		fill: false,
		    	},{
		      		data: [300,700,2000,5000,6000,4000,2000,1000,200,100],
		      		borderColor: "#FFCD50",
		      		fill: false
		    	},{
		      		data: [300,700,2000,5000,6000,4000,2000,1000,200,100],
		      		borderColor: "#A7214B",
		      		fill: false
		    	}]		
		  	},
		  	options: {
		    	legend: {display: false}
		  	}
		});
	    
	};




	console.log("dom ok")
	
}


