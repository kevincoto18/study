import { Component } from '@angular/core';
import Swal from 'sweetalert2';

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

  eliminarFila(index: number) {
    this.notas.splice(index, 1);
    this.porcentajes.splice(index, 1);
  }
  
  calculate() {
    if (this.notas.length !== this.porcentajes.length) {
      console.log('Las notas y porcentajes no son iguales');
      return;
    }

    const GradesValue = this.notas.reduce(
      (total, grade, i) => total + grade * (this.porcentajes[i] / 100),
      0
    );
    console.log('Promedio ponderado:', GradesValue);

    const GradeFinal =
      Math.round(
        ((this.notaDeseada - GradesValue) / (this.porcentajeRestante / 100)) *
          100
      ) / 100;
    console.log('Final:', GradeFinal);

    if (GradeFinal < 60) {
      Swal.fire(
        '¡Felicidades!',
        `Te falta solo un  ${GradeFinal.toFixed(
          2
        )} para pasar, tu promedio es de un  ${GradesValue.toFixed(2)} %`,
        'success'
      );
    } else if (GradeFinal >= 60 && GradeFinal < 70) {
      Swal.fire(
        'Sigue asi!',
        `Te falta solo un  ${GradeFinal.toFixed(
          2
        )} para pasar, tu promedio es de un  ${GradesValue.toFixed(2)} %`,
        'info'
      );
    } else if (GradeFinal >= 70 && GradeFinal <= 99) {
      Swal.fire(
        'Pon tu maximo esfuerzo',
        `Ocuparias un  ${GradeFinal.toFixed(
          2
        )} para pasar, tu promedio es de un  ${GradesValue.toFixed(2)} %`,
        'warning'
      );
    } else if (GradeFinal >= 100) {
      Swal.fire(
        'Tal vez para la proxima :/',
        `Ocuparias un  ${GradeFinal.toFixed(
          2
        )} para pasar, tu promedio es de un  ${GradesValue.toFixed(2)} %`,
        'error'
      );
    }
  }

  validateInput(event: any) {
    const pattern = /[0-9]/;
    if (!pattern.test(event.target.value)) {
      event.target.value = event.target.value.replace(/[^0-9]/g, '');
    }
  }
}
