---
title: Building an Ancestry chart with Vue and Chart.js
layout: post
author: Vinicius Philot
bgcolor: "#f4f4f4"
---


After scoring a nice deal on 23andme and going through the useless (but utterly entertaining) journey of finding out more about my origins, I couldn't wait to replicate the nice pie graphs 23andme shows on their (very nice) web app. 

[**See it live**](https://hardcore-shaw-54dbef.netlify.com){:target="_blank"}

I knew I wanted to use Vue to speed up my development process, but I had no idea on which chart library I should use, having very little experience with this before. I decided to go with [**Chart.js**](https://www.chartjs.org/) and found [**vue-chartjs**](https://vue-chartjs.org/) as ready-to-use solution with Vue.

### Setting up the project
{: .intro .title .is-3 .has-text-weight-normal .has-line-spacing-tall}


Using Vue-CLI, I started off with a templated starter project:

```bash
$ vue create vue-ancestry-chart
```

```bash
$ npm install vue-chartjs chart.js --save
```

I needed one simple component to make it work: `AncestryChart.vue`, which made the final folder structure pretty simple:

```bash
├── src
│   ├── main.js
│   ├── components
│   │   └── AncestryChart.vue
│   ├── assets
│   │   └── logo.png
│   └── App.vue
├── public
│   ├── index.html
│   ├── favicon.ico
│   └── ancestry_composition.csv
├── package.json
├── babel.config.js
└── README.md
```
### Creating the Chart component
{: .intro .title .is-3 .has-text-weight-normal .has-line-spacing-tall}

Inside `App.vue`, we need to import our `AncestryChart.vue` component and register it for future use:

```js
import AncestryChart from './components/AncestryChart.vue'

export default {
  name: 'app',
  components: {
    AncestryChart
  }
}
```

And now inside `AncestryChart.vue` we need to setup `vue-chartjs` properly. I chose the Doughnut chart and imported the mixins so we can bind data accurately.

```js
import { Doughnut, mixins }  from 'vue-chartjs'

export default {
  name: 'AncestryChart',
  extends: Doughnut,
  mixins: [mixins.reactiveProp],

props: {
  chartData: {},
  options: {}
},

  mounted() {
    this.renderChart(this.chartData, this.options)
  }
}
```

As you can see above, we need two main props to make our chart render: `chartData` and `options`. Both of them will be sent to this component by our main `App.vue`. I will not go through the options object since it's just a simple set of extensive configuration options, but the next sections will explain how to set up our chart data properly.


### Data structure
{: .intro .title .is-3 .has-text-weight-normal .has-line-spacing-tall}

Downloading raw data from 23andme can be done in two ways: the whole full DNA set grouped my chromossome (which would be hard to make sense of since I'm not a Genetic Engineer) or a simple outline of ancestry ocurrences. Needless to say, I went for the second option:

The CSV file looked like this:
<div class="table-container">
<table class="table is-bordered is-fullwidth">
  <thead>
    <tr>
      <th>Ancestry</th>
      <th>Copy</th>
      <th>Chromossome</th>
      <th>Start</th>
      <th>End</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Broadly Northwestern European</td>
      <td>1</td>
      <td>chr4</td>
      <td>79843697</td>
      <td>89063363</td>
    </tr>
    <tr>
      <td>Broadly Sub-Saharan African</td>
      <td>1</td>
      <td>chr1</td>
      <td>24549064</td>
      <td>249222527</td>
    </tr>
    <tr>
      <td>…</td>
      <td>…</td>
      <td>…</td>
      <td>&nbsp;</td>
      <td>&nbsp;</td>
    </tr>
  </tbody>
</table>
</div>

Something I had quite never done before though was parsing CSV data in JavaScript. I found a very useful library for this -  [https://github.com/d3/d3-fetch](d3-fetch) - which I'll explain how to implement it below. 

### Using d3-fetch to parse CSV data
{: .intro .title .is-3 .has-text-weight-normal .has-line-spacing-tall}

```bash
$ npm install d3-fetch --save
```

After installing `d3-fetch`, we need to make it available inside `App.vue`. Using external libraries inside Vue components can be done with the following import statement:

```js
import * as d3 from '../node_modules/d3-fetch/dist/d3-fetch'
```

The computed data we'll extract from the CSV file needs somewhere to live inside the main App component, and we'll use the `data` object for that""

```js
 data() {
    return {
      dataset: {},
      options: {
        //options here
    }
  }
 }
```
We'll now start parsing the CSV data by creating a new function inside `methods`:

```js
  methods: {
    
    //use d3-fetch to read the CSV file and output it in readable data
    readCSV(csvFile) {
      d3.csv(csvFile).then( data => this.parseData(data) );
    },
    
    //parse raw csv data and get ancestry count
    parseData(data) {
      //creating a temporary object to get the ancestry regions count
      let composition = {};
      //mapping the outcome of d3-fech to the temporary object
      data.map( item  => {
        if(!composition.hasOwnProperty(item.Ancestry)) 
        {
          composition[item.Ancestry] = 1;
        } else {
          composition[item.Ancestry] += 1;
        }
      });

      //this is the boilerplate structure for the data vue-chartjs needs
      let d = {
        labels: [],
        datasets: [{
          label: 'Ancestry:',
          data: [],
          backgroundColor: [],
          borderColor: [],
          borderAlign: 'inner',
          borderWidth: 0.5,
        }]
      };

      //calculating totals to transform absolute count numbers into percentages
      let total = 0;
      for (let key in composition) {
        total += composition[key];
      }

      //since the CSV files outputs results alphabetically, we need to sort them by count number
      let compositionSorted = [];
      for (let key in composition){
        compositionSorted.push({ancestry: key, count: composition[key]})
      }
      compositionSorted.sort(function(a, b) { 
        return a.count -+b.count;
      })
      compositionSorted.reverse();

      //finally, mapping our sorted array into the final structured data 
      compositionSorted.map(item => {
        d.labels.push(item.ancestry);
        d.datasets[0].data.push((item.count/total*100).toFixed(2));
     })

     //binding the reactive data object to this final result 
      this.dataset = d;
    },
  }
```
A quick overview of what's happening above: there's a short function named `readCSV()` that takes a CSV file as an argument and uses d3-fetch to read the it and output an array of objects. `readCSV` will then call `parseData()`, passing the outcome as an argument. From there on we'll do all the data handling necessary to find unique instances of ancestry regions and sort them by ocurrence count.

Everything left to do now is only implement the `AncestryChart.vue` component inside `App.vue` and bind the dataset:

```html
  <AncestryChart :chartData="this.dataset" :options="this.options" />
```


### Learnings
{: .intro .title .is-3 .has-text-weight-normal .has-line-spacing-tall}

This simple project was fun to build and interesting in terms of learning outcomes. I discovered I still need to explore more data structures (a simple CSV was quite a hassle to parse!) and explore other chart libraries. Chart.js is pretty comprehensive and has a ton of customization options, however it's hard to fine tune its styling and responsiveness since it's rendered inside a `<canvas>` element. [You can see the project live here.](https://gracious-cori-4bd380.netlify.com/).

