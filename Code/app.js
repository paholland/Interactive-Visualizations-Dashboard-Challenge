
function plots(id) {

    d3.json('samples.json').then (sampleData => {

        console.log(sampleData)
    var ids = sampleData.samples[0].otu_ids;
    // console.log(ids)

    var labels =  sampleData.samples[0].otu_labels.slice(0,10);
    // console.log (labels)

    var sampleValues =  sampleData.samples[0].sample_values.slice(0,10).reverse();
    // console.log(sampleValues)       

    //
    var labels =  sampleData.samples[0].otu_labels.slice(0,10);
// console.log(labels)

// top ten ids
    var otu_top = (sampleData.samples[0].otu_ids.slice(0,10)).reverse();
    var otu_id = otu_top.map(X=> "OTU" + X);
    console.log("OTU IDS: ${otu_id")  
// labels for the plotting

    var labels = sampleData.samples[0].otu_labels.slice(0,10);
    console.log("OTU_lavels: ${labels}")

    // console.log("OTU_labels: ${labels}")
    var trace = {
        x: sampleValues,
        y: otu_id,
        text: labels,
        marker: {
        color: 'blue'},
        type:"bar",
        orientation: "h",
    };
    // var for data
    var data = [trace];

    // layout for plots

    var layout1 = {
        title: "Top 10 OTU",
        yaxis:{
            tickmode:"linear",
        },
        margin: {
            l: 150,
            r: 150,
            t: 150,
            b: 50
        }
    };
  // bar plot
    Plotly.newPlot("bar", data, layout1);

  // bubble chart
    var data2 = [{
      x: sampleData.samples[0].otu_ids,
      y: sampleData.samples[0].sample_values,
      mode: "markers",
      marker: {
          size: sampleData.samples[0].sample_values,
          color: sampleData.samples[0].otu_ids
      },
      text:  sampleData.samples[0].otu_labels
    }];
 
// bubble plot layout

    var layout2 = {
    x_axis:{title: "OTU ID"},
    height: 500,
    width: 800
    };


    // var data2 = [trace];

// create the bubble plot
    Plotly.newPlot("bubble", data2, layout2); 

});
}

// how to get data..read json

function getData(id) {

    d3.json('samples.json').then ((data) => {

    var metadata = data.metadata;
    // console.log(metadata) 

    var outcome = metadata.filter(meta => meta.id.toString() === id)[0];

    var demogr = d3.select("#sample-metadata");

    demogr.html("");

// 
    Object.entries(outcome).forEach(([key,value]) => {

        demogr.append("h5").text(key.toUpperCase() + ":"+ value);   
        });

    });

    }

// change event

function optionChanged(id) {

    plots(id);
    getData(id);

}


function init(){
    var dropdownMenu = d3.select("#selDataset")

    d3.json('samples.json').then ((data) => {
        console.log(data) 
    var sample_names = data.names 
    sample_names.forEach((x)=>{
    dropdownMenu.append("option").text(x).property("value");
    })
        plots(sample_names[0]);
        getData(sample_names[0]);  
    });

    };

    // run it 
    init()

