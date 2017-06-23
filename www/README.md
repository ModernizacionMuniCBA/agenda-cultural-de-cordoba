# Agenda cultural abierta de Córdoba

Sobre los datos abiertos de la actividad cultural del Municipio se crea esta aplicación que permite buscar actividades culturales de la Municipalidad de Cördoba

Será 100% en HTML5/JS con llamadas al API (abierta) de eventos del municipio.  
Se usara como web primero y se embeberá con Phonegap o similar a aplicación Android. Debe ser responsivo.

Los datos están estructurados como:
 - Eventos: Agrupador principal. En este caso la _Feria del Libro_ es un evento que agrupa todo lo demás. 
 - Agrupador: Grupo de eventos relacionados. Para la feria del libro se definen _espacios_ que cumplirán este rol.
 - Actividades: Cada actividad en particular. 
