import { Component } from '@angular/core';

@Component({
  selector: 'calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.css'],
})
export class CalculatorComponent {
  notas: number[] = [0];
  porcentajes: number[] = [0];
  notaDeseada = 70;
  porcentajeRestante: number = 30;
  notaFinal: number = 0;
  agregarLinea() {
    this.notas.push(1); // Agrega un nuevo elemento nulo
    this.porcentajes.push(1);
  }

  calculate() {
    if (this.notas.length !== this.porcentajes.length) {
      console.log('Las notas y porcentajes no son iguales');
      return;
    }

    const GradesValue = this.notas.reduce((total, grade, i) => total + (grade * (this.porcentajes[i] / 100)), 0);
    console.log("Promedio ponderado:", GradesValue);

    const GradeFinal = Math.round(((this.notaDeseada - GradesValue) / (this.porcentajeRestante / 100)) * 100) / 100;
    console.log("Final:", GradeFinal);
  }

  validateInput(event: any) {
    const pattern = /[0-9]/;
    if (!pattern.test(event.target.value)) {
      event.target.value = event.target.value.replace(/[^0-9]/g, '');
    }
  }
}
