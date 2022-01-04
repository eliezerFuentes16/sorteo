import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  constructor(private _snackBar: MatSnackBar) { 

   }
  botonesElegir:any=[];
  cantidadApostar!:any;
  color=["link", "link","link","link", "link","link", "link","link","link", "link"]; // este array es el que va acambiar a medida que 
  // se vallan clickeando los botones

  noEscogidas:any=[
    {number:"", color:"link"},
    {number:"", color:"link"},
    {number:"", color:"link"},
    {number:"", color:"link"},
    {number:"", color:"link"},
    
  ]
  ganador=0;

  spinner=false;
  verSpinner=true;
  ganaste!:boolean;
  seleccionadas=0;
  seleccionada!:any;
  numero:number=0;

  ganancia=0;
  cantidadTotal=0;

  saberTotal(){
    let totalApuesta=0;
    for (let i = 0; i < this.botonesElegir.length; i++) {
      totalApuesta=this.botonesElegir[i].apuesta+totalApuesta;
    }
    this.cantidadTotal=totalApuesta;
  }
  verificarBotonesSeleccionados()
  {
    for (let i = 0; i < this.botonesElegir.length; i++) {
      let numero=this.botonesElegir[i].number-1;
      console.log(numero)
      this.color[numero]="primary"; 
    }
  }
  elegirBall(number: number){
    this.seleccionada=number+1;
      if(this.color[number]=="link"){
        if (this.seleccionadas<5){
          for (let i = 0; i < this.color.length; i++) {
            if(this.color[i]=="warn"){
              this.color[i]="link";
            }   
          }
          this.color[number]="warn";
          this.verificarBotonesSeleccionados();
        }
      }else{
        this.seleccionada="";
        this.color[number]="link";
        this.seleccionadas--;
        
        for (let i = 0; i < this.botonesElegir.length; i++) {
          if (this.botonesElegir[i].number==number+1){
            this.botonesElegir.splice (i, 1);
			      let total=5-this.botonesElegir.length;
			      this.noEscogidas=[];
			      for (let i = 0; i < total; i++) {
			        this.noEscogidas.push(
				        {number:"", color:"link"}
				      ); 
			      }
          } 
        }
        this.saberTotal();
      }
  }

  botonOk(){
    if (this.cantidadApostar<6){
      this._snackBar.open('La cantidad a apostar debe ser mayor a 5', 'Cerrar', {
        duration:2500,
        horizontalPosition:"center",
        verticalPosition: "bottom"
      });
      
    }else if(this.seleccionada==""){
      this._snackBar.open('Debe Seleccionar un numero', 'Cerrar', {
        duration:2500,
        horizontalPosition:"center",
        verticalPosition: "bottom"
      });
    
    }else{
      this.botonesElegir.push({number:this.seleccionada, color:"primary", apuesta:this.cantidadApostar});
      let total=5-this.botonesElegir.length;
      this.noEscogidas=[];
      for (let i = 0; i < total; i++) {
        this.noEscogidas.push(
          {number:"", color:"link"}
        ); 
        
      }
      this.saberTotal();
      this.verificarBotonesSeleccionados();
      this.seleccionada="";
      this.cantidadApostar="";
      this.seleccionadas++;
     
    }
  }

  empezarApuesta(){
    if(this.botonesElegir.length==0){
      this._snackBar.open('Debe agregar una apuesta al numero seleccionado', 'Cerrar', {
        duration:2500,
        horizontalPosition:"center",
        verticalPosition: "bottom"
      });
      
      return
    }
      this.seleccionada="";
      this.cantidadApostar="";
      this.spinner=true;
      this.ganador=Math.floor(Math.random() * (10 - 1 + 1) + 1);
      setTimeout(() => {
        this.verSpinner=false;
        for (let i = 0; i < this.botonesElegir.length; i++) {
          if (this.botonesElegir[i].number==this.ganador){
            this.ganaste=true;
            this.ganancia=this.botonesElegir[i].apuesta*1.5;
            return
          }else{
            this.ganaste=false;
          }
        }
      }, 2500);
    
  }

  volverAJugar(){
    this.spinner=true; 
    this.verSpinner=true;
      setTimeout(() => {        
        this.botonesElegir=[];
        this.cantidadApostar="";
        this.color=["link", "link","link","link", "link","link", "link","link","link", "link"]; // este array es el que va acambiar a medida que 
        this.seleccionada="";
        this.cantidadTotal=0;
        this.noEscogidas=[
          {number:"", color:"link"},
          {number:"", color:"link"},
          {number:"", color:"link"},
          {number:"", color:"link"},
          {number:"", color:"link"},
        ]
        this.ganador=0;
        this.spinner=false;
        this.verSpinner=true;
        this.ganaste=false;
        this.seleccionadas=0;
        this.numero=0;
        
      }, 1500);
    
   }
}
