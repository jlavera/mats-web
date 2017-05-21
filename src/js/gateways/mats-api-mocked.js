import bluebird from 'bluebird';

module.exports = {
  getCareers: () => {
    return bluebird.resolve([{
      "code": "K",
      "name": "Ingeniería en sistemas"
    },
    {
      "code": "Q",
      "name": "Ingeniería química"
    },
    {
      "code": "I",
      "name": "Ingeniería industrial"
    },
    {
      "code": "N",
      "name": "Ingeniería naval"
    },
    {
      "code": "T",
      "name": "Ingeniería textil"
    },
    {
      "code": "M",
      "name": "Ingeniería mecánica"
    },
    {
      "code": "O",
      "name": "Ingeniería electrónica"
    },
    {
      "code": "C",
      "name": "Ingeniería civil"
    },
    {
      "code": "E",
      "name": "Ingeniería eléctrica"
    }]);
  },

  getCoursesByCareer: () => {
    return bluebird.resolve([{
      "code": "082022",
      "name": "Arquitectura de Computadoras",
      "duration": "A",
      "hours": "4",
      "year": "1",
      "optative": false,
      "main": false
    },
    {
      "code": "082031",
      "name": "Redes de Información",
      "duration": "C",
      "hours": "8",
      "year": "4",
      "optative": false,
      "main": false
    },
    {
      "code": "082021",
      "name": "Algoritmos y Estructura de Datos",
      "duration": "A",
      "hours": "5",
      "year": "1",
      "optative": false,
      "main": false
    },
    {
      "code": "950703",
      "name": "Análisis Matemático 2",
      "duration": "A",
      "hours": "5",
      "year": "2",
      "optative": false,
      "main": false
    },
    {
      "code": "082026",
      "name": "Paradigmas de Programación",
      "duration": "A",
      "hours": "8",
      "year": "2",
      "optative": false,
      "main": false
    },
    {
      "code": "950310",
      "name": "Legislación",
      "duration": "C",
      "hours": "4",
      "year": "3",
      "optative": false,
      "main": false
    },
    {
      "code": "082029",
      "name": "Comunicaciones",
      "duration": "C",
      "hours": "8",
      "year": "4",
      "optative": false,
      "main": false
    },
    {
      "code": "950704",
      "name": "Probabilidad y Estadística",
      "duration": "C",
      "hours": "6",
      "year": "2",
      "optative": false,
      "main": false
    },
    {
      "code": "082036",
      "name": "Teoría de Control",
      "duration": "C",
      "hours": "6",
      "year": "4",
      "optative": false,
      "main": false
    },
    {
      "code": "082041",
      "name": "Simulación",
      "duration": "C",
      "hours": "8",
      "year": "4",
      "optative": false,
      "main": false
    },
    {
      "code": "082024",
      "name": "Análisis de Sistemas",
      "duration": "A",
      "hours": "6",
      "year": "2",
      "optative": false,
      "main": true
    },
    {
      "code": "082033",
      "name": "Administración de Recursos",
      "duration": "A",
      "hours": "6",
      "year": "4",
      "optative": false,
      "main": true
    },
    {
      "code": "082038",
      "name": "Ingeniería de Software",
      "duration": "C",
      "hours": "6",
      "year": "4",
      "optative": false,
      "main": false
    },
    {
      "code": "082020",
      "name": "Matemática Discreta",
      "duration": "A",
      "hours": "3",
      "year": "1",
      "optative": false,
      "main": false
    },
    {
      "code": "950606",
      "name": "Física 2",
      "duration": "C",
      "hours": "10",
      "year": "3",
      "optative": false,
      "main": false
    },
    {
      "code": "082037",
      "name": "Proyecto Final",
      "duration": "A",
      "hours": "6",
      "year": "5",
      "optative": false,
      "main": true
    },
    {
      "code": "082025",
      "name": "Sintaxis y Semántica de los Lenguajes",
      "duration": "A",
      "hours": "4",
      "year": "2",
      "optative": false,
      "main": false
    },
    {
      "code": "082039",
      "name": "Administración Gerencial",
      "duration": "C",
      "hours": "6",
      "year": "5",
      "optative": false,
      "main": false
    },
    {
      "code": "950309",
      "name": "Economía",
      "duration": "C",
      "hours": "6",
      "year": "3",
      "optative": false,
      "main": false
    },
    {
      "code": "082023",
      "name": "Sistemas y Organizaciones",
      "duration": "A",
      "hours": "3",
      "year": "1",
      "optative": false,
      "main": true
    },
    {
      "code": "082030",
      "name": "Gestión de Datos",
      "duration": "C",
      "hours": "8",
      "year": "3",
      "optative": false,
      "main": false
    },
    {
      "code": "082034",
      "name": "Investigación Operativa",
      "duration": "C",
      "hours": "10",
      "year": "4",
      "optative": false,
      "main": false
    },
    {
      "code": "082032",
      "name": "Matemática Superior",
      "duration": "C",
      "hours": "8",
      "year": "3",
      "optative": false,
      "main": false
    },
    {
      "code": "095070",
      "name": "Análisis Matemático 1",
      "duration": "A",
      "hours": "5",
      "year": "1",
      "optative": false,
      "main": false
    },
    {
      "code": "082027",
      "name": "Sistemas Operativos",
      "duration": "C",
      "hours": "8",
      "year": "3",
      "optative": false,
      "main": false
    },
    {
      "code": "082028",
      "name": "Diseño de Sistemas",
      "duration": "A",
      "hours": "6",
      "year": "3",
      "optative": false,
      "main": true
    },
    {
      "code": "951604",
      "name": "Ingeniería y Sociedad",
      "duration": "C",
      "hours": "4",
      "year": "1",
      "optative": false,
      "main": false
    },
    {
      "code": "950605",
      "name": "Física 1",
      "duration": "A",
      "hours": "5",
      "year": "2",
      "optative": false,
      "main": false
    },
    {
      "code": "081420",
      "name": "Química",
      "duration": "C",
      "hours": "6",
      "year": "1",
      "optative": false,
      "main": false
    },
    {
      "code": "951602",
      "name": "Inglés 1",
      "duration": "C",
      "hours": "4",
      "year": "2",
      "optative": false,
      "main": false
    },
    {
      "code": "082040",
      "name": "Inteligencia Artificial",
      "duration": "C",
      "hours": "6",
      "year": "5",
      "optative": false,
      "main": false
    },
    {
      "code": "082035",
      "name": "Sistemas de Gestión",
      "duration": "C",
      "hours": "8",
      "year": "5",
      "optative": false,
      "main": false
    },
    {
      "code": "950702",
      "name": "Álgebra y Geometría Analítica",
      "duration": "A",
      "hours": "5",
      "year": "1",
      "optative": false,
      "main": false
    },
    {
      "code": "951603",
      "name": "Inglés 2",
      "duration": "C",
      "hours": "4",
      "year": "3",
      "optative": false,
      "main": false
    },
    {
      "code": "951601",
      "name": "Sistemas de Representación",
      "duration": "A",
      "hours": "3",
      "year": "2",
      "optative": false,
      "main": false
    }
  ])},

  getTreeByCareer: () => {
    return bluebird.resolve([{
      "code": "950309",
      "dependencies": [
        {
          "type": "A",
          "code": "082023"
        },
        {
          "type": "A",
          "code": "082021"
        },
        {
          "type": "S",
          "code": "082024"
        }
      ]
    },
    {
      "code": "950606",
      "dependencies": [
        {
          "type": "S",
          "code": "950605"
        },
        {
          "type": "S",
          "code": "095070"
        }
      ]
    },
    {
      "code": "082030",
      "dependencies": [
        {
          "type": "A",
          "code": "082020"
        },
        {
          "type": "A",
          "code": "082021"
        },
        {
          "type": "A",
          "code": "082023"
        },
        {
          "type": "S",
          "code": "082025"
        },
        {
          "type": "S",
          "code": "082024"
        },
        {
          "type": "S",
          "code": "082026"
        }
      ]
    },
    {
      "code": "082039",
      "dependencies": [
        {
          "type": "A",
          "code": "082027"
        },
        {
          "type": "A",
          "code": "950704"
        },
        {
          "type": "A",
          "code": "082032"
        },
        {
          "type": "A",
          "code": "082028"
        },
        {
          "type": "A",
          "code": "950309"
        },
        {
          "type": "S",
          "code": "082034"
        },
        {
          "type": "S",
          "code": "082033"
        }
      ]
    },
    {
      "code": "082024",
      "dependencies": [
        {
          "type": "S",
          "code": "082023"
        },
        {
          "type": "S",
          "code": "082021"
        }
      ]
    },
    {
      "code": "082027",
      "dependencies": [
        {
          "type": "S",
          "code": "082021"
        },
        {
          "type": "S",
          "code": "082023"
        },
        {
          "type": "S",
          "code": "082020"
        }
      ]
    },
    {
      "code": "082033",
      "dependencies": [
        {
          "type": "A",
          "code": "082022"
        },
        {
          "type": "A",
          "code": "951602"
        },
        {
          "type": "A",
          "code": "082024"
        },
        {
          "type": "A",
          "code": "082026"
        },
        {
          "type": "S",
          "code": "950309"
        },
        {
          "type": "S",
          "code": "082028"
        },
        {
          "type": "S",
          "code": "082027"
        }
      ]
    },
    {
      "code": "082036",
      "dependencies": [
        {
          "type": "A",
          "code": "950703"
        },
        {
          "type": "A",
          "code": "950606"
        },
        {
          "type": "S",
          "code": "081420"
        },
        {
          "type": "S",
          "code": "082020"
        }
      ]
    },
    {
      "code": "082035",
      "dependencies": [
        {
          "type": "A",
          "code": "950309"
        },
        {
          "type": "A",
          "code": "082027"
        },
        {
          "type": "A",
          "code": "950704"
        },
        {
          "type": "A",
          "code": "082032"
        },
        {
          "type": "A",
          "code": "082028"
        },
        {
          "type": "S",
          "code": "082034"
        },
        {
          "type": "S",
          "code": "082041"
        },
        {
          "type": "S",
          "code": "082033"
        }
      ]
    },
    {
      "code": "082029",
      "dependencies": [
        {
          "type": "A",
          "code": "095070"
        },
        {
          "type": "A",
          "code": "950702"
        },
        {
          "type": "A",
          "code": "950605"
        },
        {
          "type": "S",
          "code": "950703"
        },
        {
          "type": "S",
          "code": "082022"
        },
        {
          "type": "S",
          "code": "950606"
        }
      ]
    },
    {
      "code": "950704",
      "dependencies": [
        {
          "type": "S",
          "code": "095070"
        },
        {
          "type": "S",
          "code": "950702"
        }
      ]
    },
    {
      "code": "082041",
      "dependencies": [
        {
          "type": "A",
          "code": "950703"
        },
        {
          "type": "S",
          "code": "950704"
        },
        {
          "type": "S",
          "code": "082032"
        }
      ]
    },
    {
      "code": "082038",
      "dependencies": [
        {
          "type": "A",
          "code": "082026"
        },
        {
          "type": "A",
          "code": "082024"
        },
        {
          "type": "A",
          "code": "082025"
        },
        {
          "type": "S",
          "code": "082028"
        },
        {
          "type": "S",
          "code": "082030"
        },
        {
          "type": "S",
          "code": "950704"
        }
      ]
    },
    {
      "code": "082032",
      "dependencies": [
        {
          "type": "A",
          "code": "950702"
        },
        {
          "type": "A",
          "code": "095070"
        },
        {
          "type": "S",
          "code": "950703"
        }
      ]
    },
    {
      "code": "082026",
      "dependencies": [
        {
          "type": "S",
          "code": "082021"
        },
        {
          "type": "S",
          "code": "082020"
        }
      ]
    },
    {
      "code": "951603",
      "dependencies": [
        {
          "type": "A",
          "code": "951602"
        }
      ]
    },
    {
      "code": "950310",
      "dependencies": [
        {
          "type": "A",
          "code": "082021"
        },
        {
          "type": "A",
          "code": "082023"
        },
        {
          "type": "S",
          "code": "082024"
        },
        {
          "type": "S",
          "code": "951604"
        }
      ]
    },
    {
      "code": "082031",
      "dependencies": [
        {
          "type": "A",
          "code": "082022"
        },
        {
          "type": "A",
          "code": "950606"
        },
        {
          "type": "A",
          "code": "082021"
        },
        {
          "type": "A",
          "code": "082020"
        },
        {
          "type": "A",
          "code": "950703"
        },
        {
          "type": "S",
          "code": "082029"
        },
        {
          "type": "S",
          "code": "082027"
        }
      ]
    },
    {
      "code": "082040",
      "dependencies": [
        {
          "type": "A",
          "code": "082028"
        },
        {
          "type": "A",
          "code": "950704"
        },
        {
          "type": "A",
          "code": "082032"
        },
        {
          "type": "S",
          "code": "082041"
        },
        {
          "type": "S",
          "code": "082034"
        }
      ]
    },
    {
      "code": "082028",
      "dependencies": [
        {
          "type": "A",
          "code": "082020"
        },
        {
          "type": "A",
          "code": "082023"
        },
        {
          "type": "A",
          "code": "082021"
        },
        {
          "type": "S",
          "code": "082026"
        },
        {
          "type": "S",
          "code": "082024"
        }
      ]
    },
    {
      "code": "082034",
      "dependencies": [
        {
          "type": "A",
          "code": "950703"
        },
        {
          "type": "S",
          "code": "082032"
        },
        {
          "type": "S",
          "code": "950704"
        }
      ]
    },
    {
      "code": "950703",
      "dependencies": [
        {
          "type": "S",
          "code": "950702"
        },
        {
          "type": "S",
          "code": "095070"
        }
      ]
    },
    {
      "code": "082037",
      "dependencies": [
        {
          "type": "A",
          "code": "950309"
        },
        {
          "type": "A",
          "code": "082028"
        },
        {
          "type": "A",
          "code": "951603"
        },
        {
          "type": "A",
          "code": "082027"
        },
        {
          "type": "A",
          "code": "951604"
        },
        {
          "type": "A",
          "code": "082029"
        },
        {
          "type": "A",
          "code": "951601"
        },
        {
          "type": "A",
          "code": "082030"
        },
        {
          "type": "A",
          "code": "950704"
        },
        {
          "type": "S",
          "code": "082033"
        },
        {
          "type": "S",
          "code": "082031"
        },
        {
          "type": "S",
          "code": "082038"
        },
        {
          "type": "S",
          "code": "950310"
        }
      ]
    },
    {
      "code": "082025",
      "dependencies": [
        {
          "type": "S",
          "code": "082020"
        },
        {
          "type": "S",
          "code": "082021"
        }
      ]
    }
  ])},

  getReverseTreeByCareer: () => {
    return bluebird.resolve([{
      "code": "950309",
      "dependents": [{
        "type": "A",
        "code": "082037"
      }, {
        "type": "A",
        "code": "082039"
      }, {
        "type": "A",
        "code": "082035"
      }, {
        "type": "S",
        "code": "082033"
      }]
    }, {
      "code": "950606",
      "dependents": [{
        "type": "A",
        "code": "082031"
      }, {
        "type": "A",
        "code": "082036"
      }, {
        "type": "S",
        "code": "082029"
      }]
    }, {
      "code": "082030",
      "dependents": [{
        "type": "A",
        "code": "082037"
      }, {
        "type": "S",
        "code": "082038"
      }]
    }, {
      "code": "082024",
      "dependents": [{
        "type": "A",
        "code": "082033"
      }, {
        "type": "A",
        "code": "082038"
      }, {
        "type": "S",
        "code": "082030"
      }, {
        "type": "S",
        "code": "950310"
      }, {
        "type": "S",
        "code": "950309"
      }, {
        "type": "S",
        "code": "082028"
      }]
    }, {
      "code": "082027",
      "dependents": [{
        "type": "A",
        "code": "082037"
      }, {
        "type": "A",
        "code": "082035"
      }, {
        "type": "S",
        "code": "082031"
      }, {
        "type": "A",
        "code": "082039"
      }, {
        "type": "S",
        "code": "082033"
      }]
    }, {
      "code": "950702",
      "dependents": [{
        "type": "A",
        "code": "082032"
      }, {
        "type": "A",
        "code": "082029"
      }, {
        "type": "S",
        "code": "950703"
      }, {
        "type": "S",
        "code": "950704"
      }]
    }, {
      "code": "082033",
      "dependents": [{
        "type": "S",
        "code": "082037"
      }, {
        "type": "S",
        "code": "082035"
      }, {
        "type": "S",
        "code": "082039"
      }]
    }, {
      "code": "082021",
      "dependents": [{
        "type": "A",
        "code": "950310"
      }, {
        "type": "S",
        "code": "082025"
      }, {
        "type": "A",
        "code": "082031"
      }, {
        "type": "A",
        "code": "082030"
      }, {
        "type": "A",
        "code": "082028"
      }, {
        "type": "S",
        "code": "082026"
      }, {
        "type": "S",
        "code": "082024"
      }, {
        "type": "A",
        "code": "950309"
      }, {
        "type": "S",
        "code": "082027"
      }]
    }, {
      "code": "951601",
      "dependents": [{
        "type": "A",
        "code": "082037"
      }]
    }, {
      "code": "951604",
      "dependents": [{
        "type": "A",
        "code": "082037"
      }, {
        "type": "S",
        "code": "950310"
      }]
    }, {
      "code": "082029",
      "dependents": [{
        "type": "A",
        "code": "082037"
      }, {
        "type": "S",
        "code": "082031"
      }]
    }, {
      "code": "950704",
      "dependents": [{
        "type": "A",
        "code": "082037"
      }, {
        "type": "A",
        "code": "082035"
      }, {
        "type": "A",
        "code": "082039"
      }, {
        "type": "A",
        "code": "082040"
      }, {
        "type": "S",
        "code": "082034"
      }, {
        "type": "S",
        "code": "082041"
      }, {
        "type": "S",
        "code": "082038"
      }]
    }, {
      "code": "082041",
      "dependents": [{
        "type": "S",
        "code": "082035"
      }, {
        "type": "S",
        "code": "082040"
      }]
    }, {
      "code": "082020",
      "dependents": [{
        "type": "A",
        "code": "082030"
      }, {
        "type": "A",
        "code": "082031"
      }, {
        "type": "S",
        "code": "082026"
      }, {
        "type": "S",
        "code": "082025"
      }, {
        "type": "A",
        "code": "082028"
      }, {
        "type": "S",
        "code": "082036"
      }]
    }, {
      "code": "950605",
      "dependents": [{
        "type": "A",
        "code": "082029"
      }, {
        "type": "S",
        "code": "950606"
      }]
    }, {
      "code": "082023",
      "dependents": [{
        "type": "A",
        "code": "082028"
      }, {
        "type": "A",
        "code": "082030"
      }, {
        "type": "A",
        "code": "950310"
      }, {
        "type": "S",
        "code": "082024"
      }, {
        "type": "A",
        "code": "950309"
      }, {
        "type": "S",
        "code": "082027"
      }]
    }, {
      "code": "082038",
      "dependents": [{
        "type": "S",
        "code": "082037"
      }]
    }, {
      "code": "095070",
      "dependents": [{
        "type": "A",
        "code": "082032"
      }, {
        "type": "A",
        "code": "082029"
      }, {
        "type": "S",
        "code": "950703"
      }, {
        "type": "S",
        "code": "950606"
      }, {
        "type": "S",
        "code": "950704"
      }]
    }, {
      "code": "082026",
      "dependents": [{
        "type": "A",
        "code": "082038"
      }, {
        "type": "A",
        "code": "082033"
      }, {
        "type": "S",
        "code": "082030"
      }, {
        "type": "S",
        "code": "082028"
      }]
    }, {
      "code": "082032",
      "dependents": [{
        "type": "A",
        "code": "082039"
      }, {
        "type": "A",
        "code": "082035"
      }, {
        "type": "S",
        "code": "082034"
      }, {
        "type": "S",
        "code": "082041"
      }, {
        "type": "A",
        "code": "082040"
      }]
    }, {
      "code": "081420",
      "dependents": [{
        "type": "S",
        "code": "082036"
      }]
    }, {
      "code": "951603",
      "dependents": [{
        "type": "A",
        "code": "082037"
      }]
    }, {
      "code": "950310",
      "dependents": [{
        "type": "S",
        "code": "082037"
      }]
    }, {
      "code": "082031",
      "dependents": [{
        "type": "S",
        "code": "082037"
      }]
    }, {
      "code": "082028",
      "dependents": [{
        "type": "A",
        "code": "082037"
      }, {
        "type": "A",
        "code": "082039"
      }, {
        "type": "A",
        "code": "082035"
      }, {
        "type": "A",
        "code": "082040"
      }, {
        "type": "S",
        "code": "082033"
      }, {
        "type": "S",
        "code": "082038"
      }]
    }, {
      "code": "082034",
      "dependents": [{
        "type": "S",
        "code": "082035"
      }, {
        "type": "S",
        "code": "082039"
      }]
    }, {
      "code": "950703",
      "dependents": [{
        "type": "A",
        "code": "082031"
      }, {
        "type": "A",
        "code": "082036"
      }, {
        "type": "A",
        "code": "082034"
      }, {
        "type": "A",
        "code": "082041"
      }, {
        "type": "S",
        "code": "082032"
      }, {
        "type": "S",
        "code": "082029"
      }]
    }, {
      "code": "951602",
      "dependents": [{
        "type": "A",
        "code": "082033"
      }, {
        "type": "A",
        "code": "951603"
      }]
    }, {
      "code": "082022",
      "dependents": [{
        "type": "A",
        "code": "082031"
      }, {
        "type": "A",
        "code": "082033"
      }, {
        "type": "S",
        "code": "082029"
      }]
    }, {
      "code": "082025",
      "dependents": [{
        "type": "A",
        "code": "082038"
      }, {
        "type": "S",
        "code": "082030"
      }]
    }])
  }
};
