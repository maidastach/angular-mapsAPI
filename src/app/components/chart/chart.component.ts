import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { MeteoService } from 'src/app/services/meteo/meteo.service';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit, AfterViewInit {
  // @Input() 
  place!: any;
  newChart: any;
  temperatures: any = []

  @ViewChild('myChart') myChart!: any;
  context!: any;

  constructor(private MeteoService: MeteoService) {
    Chart.register(...registerables)
  }
  ngAfterViewInit(): void {

    console.log(this.place);

    this.context = this.myChart.nativeElement.getContext('2d');


    for(let i = 0; i < 24; i++)
    {
      this.temperatures.push(this.place.hourly.temperature_2m[i])
    }

    

    this.newChart = new Chart(
      this.context,
      {
            type: 'bar',
            data: {
                labels: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23'],
                datasets: [{
                    label: 'C temperature',
                    
                    data: this.temperatures,
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(255, 159, 64, 0.2)'
                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        }
    );
    
  }

  ngOnInit(): void {
    

    this.MeteoService.place.subscribe(place => {
      this.place = place
      console.log(place);
      for(let i = 0; i < 24; i++)
    {
      this.temperatures.push(this.place.hourly.temperature_2m[i])
    }
    this.newChart.destroy()
    this.newChart =  new Chart(
      this.context,
      {
            type: 'bar',
            data: {
                labels: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23'],
                datasets: [{
                    label: 'C temperature',
                    
                    data: this.temperatures,
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(255, 159, 64, 0.2)'
                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        }
    );
      

    })

  }

}
