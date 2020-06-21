function init() {
    var selector = d3.select("#selDataset");
  
    d3.json("samples.json").then((data) => {
      console.log(data);
      var sampleNames = data.names;
      sampleNames.forEach((sample) => {
        selector
          .append("option")
          .text(sample)
          .property("value", sample);   
      
      });     
      
  })}
  
init();


function optionChanged(newSample) {
    buildMetadata(newSample);
    buildCharts(newSample);
  }

function buildMetadata(sample) {
    d3.json("samples.json").then((data) => {
      var metadata = data.metadata;
      var resultArray = metadata.filter(sampleObj => sampleObj.id == sample);
      var result = resultArray[0];
      var PANEL = d3.select("#sample-metadata");
  
      PANEL.html("");
      PANEL.append("h6").text(`ID: ${result.id}`);
      PANEL.append("h6").text(`ETHNICITY: ${result.ethnicity}`);
      PANEL.append("h6").text(`GENDER: ${result.gender}`);
      PANEL.append("h6").text(`AGE: ${result.age}`);
      PANEL.append("h6").text(`LOCATION: ${result.location}`);
      PANEL.append("h6").text(`BBTYPE: ${result.bbtype}`);
      PANEL.append("h6").text(`WREQ: ${result.wreq}`);
    
    });
}

// Call functions to show as soon as the page uploads
buildMetadata(940);
buildCharts(940);


function buildCharts(sample) {
       // Create a horizontal bar chart to display the top 10 OTUs found in that individual
    d3.json("samples.json").then((data) => { 

      // creating x values 
      var samples = data.samples;
      var resultArray = samples.filter(sampleObj => sampleObj.id == sample);
      var result = resultArray[0];
      var sampleValues = result.sample_values.slice(0,10);

      // creating y values
      var ids = Object.values(result)[1];
      var otuIds = ids.map(otu => "OTU "+ otu);
      var otuIds10 = otuIds.slice(0,10);
    
      // create hover labels
      var otuLabels = Object.values(result)[3];
      var otuLabels10= otuLabels.slice(0,10);

      // create bar graph
      var trace = [{
        x: sampleValues.reverse(),
        y:otuIds10.reverse(),
        text: otuLabels10.reverse(),
        type: "bar",
        orientation:'h'
      }];
      var layout = {
        title: {text: "Top 10 Bacterial Species (OTUs)"},
        xaxis: {title: {text: 'Sample Values'}}
      }
         Plotly.newPlot("bar", trace,layout);

      // create a bubble chart with all of the sample values
      var sample_Values = result.sample_values;
      var trace2 =[{
        x: ids,
        y: sample_Values,
        mode: 'markers',
        marker: {
          size: sample_Values,
          color:ids,
          colorscale: 'Jet',
        }
        
      }];

        Plotly.newPlot("bubble", trace2);
        
    });
}
// // Update the restyled plot's values
// function updatePlotly(newdata) {
//     Plotly.restyle("pie", "values", [newdata]);
//   }

// // Display the default plot
// function init() {
//     var data = [{
//       values: us,
//       labels: labels,
//       type: "pie"
//     }];
  
//     var layout = {
//       height: 600,
//       width: 800
//     };
  
//     Plotly.newPlot("pie", data, layout);
//   }



// buildCharts(940);