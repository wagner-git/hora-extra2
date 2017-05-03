function calc_extra(uSal, uYear, uMonth, uCarga_hora, uQtd_hrs, uQtd_hrs_n,uQtd_hrs_df, uQtd_hrs_df_n, uDencaso_sat, uFeriados){

    console.log("App hora-extra inicializado");

    dias = calcDias(uYear,uMonth, uFeriados);

    diasTrabalho = dias[0];
    diasDescanso = dias[1];

    console.log('DIAS TRABALHO/DESCANSO: ' + diasTrabalho + "/" + diasDescanso );
    
    var sal = uSal;
    var carga_horaria = uCarga_hora;
    var qtd_hrs = calcHoraMinuto(uQtd_hrs); //17.92; //horas extra no mes (das 5:01 as 22:00)
    var qtd_hrs_n = calcHoraMinuto(uQtd_hrs_n); //0; //horas extra noturnas no mes (das 22:01 as 05:00)
    var qtd_hrs_df = calcHoraMinuto(uQtd_hrs_df);; //horas extra domingo feriado  (das 22:01 as 05:00)
    var qtd_hrs_df_n = calcHoraMinuto(uQtd_hrs_df_n);; //horas extra domingo feriado  (das 22:01 as 05:00)

    
    //JP MORGAN    
    var DSR_normal = 1.5; //adicoinal normal 50%
    var DSR_dom_feria = 2 ; //100%
    var add_noturn = 1.35; //20%

    var val = ((sal/carga_horaria)*qtd_hrs)*DSR_normal;
    var val_n = (((sal/carga_horaria)*qtd_hrs_n)*DSR_normal)*add_noturn;
    var val_df = ((sal/carga_horaria)*qtd_hrs_df)*DSR_dom_feria;
    var val_df_n = (((sal/carga_horaria)*qtd_hrs_df_n)*DSR_dom_feria)*add_noturn;

    console.log('ANO e MES: ' +  uYear + "-" + uMonth );

    console.log('SALÁRIO: ' + sal);
    console.log('QTD HRS NORMAL: ' + qtd_hrs);
    console.log('QTD HRS NOTURNA: ' + qtd_hrs_n);
    console.log('QTD HRS DOM_FERIA: ' + qtd_hrs_df);
    console.log('QTD HRS DOM_FERIA NOTURNO: ' + qtd_hrs_df_n);

// DSR = (valor total das horas extras do mês ) x domingos e feriados do mês  x  valor da hora extra com acréscimo número de dias úteis      

    var val_DSR = (val/diasTrabalho) * diasDescanso;
    var val_DSR_N = (val_n/diasTrabalho) * diasDescanso;
    var val_DSR_DF = (val_df/diasTrabalho) * diasDescanso;
    var val_DSR_DF_N = (val_df_n/diasTrabalho) * diasDescanso;

    console.log('')
    console.log("VALOR NORMAL: " + parseFloat(val).toFixed(2));
    console.log("DSR NORMAL: " + parseFloat(val_DSR).toFixed(2));
    console.log('')

    console.log("VALOR NOTURNO: " + parseFloat(val_n).toFixed(2));
    console.log("DSR NOTURNO: "  + parseFloat( val_DSR_N).toFixed(2));
    console.log('')

    console.log("VALOR DOM_FERIA: " + parseFloat(val_df).toFixed(2));
    console.log("DSR DOM-FERIA: "  + parseFloat( val_DSR_DF).toFixed(2));
    console.log('')

    console.log("VALOR DOM_FERIA NOTURNO: " + parseFloat(val_df).toFixed(2));
    console.log("DSR DOM-FERIA NOTURNO: "  + parseFloat( val_DSR_DF_N).toFixed(2));
    console.log('')

    var valfinal = (val + val_DSR);
    var valfinal_n = (val_n + val_DSR_N);
    var varfinal_df = (val_df + val_DSR_DF);
    var varfinal_df_n = (val_df + val_DSR_DF_N);

    
    
    console.log('R$ ' + parseFloat(valfinal+valfinal_n+varfinal_df+varfinal_df_n).toFixed(2) );

    /** FUNCTIONS **/
    alert("RELATÓRIO PARA O MÊS DE:     " + uYear + "-" + uMonth + "\n\n"
        + "Dias Trabalho/Descanso: " + diasTrabalho + "/" + diasDescanso + "\n\n"
        + "** NORMAL **\n"
        + "Extra R$: " + parseFloat(val).toFixed(2) 
        + "\n"
        + "DSR   R$: " + parseFloat(val_DSR).toFixed(2)
        + "\n\n"
        + "** NOTURNA **\n"
        + "Extra R$: " + parseFloat(val_n).toFixed(2) 
        + "\n"
        + "DSR   R$: " + parseFloat(val_DSR_N).toFixed(2)
        + "\n\n"
        + "** FIM DE SEMANA/FERIADOS **\n"
        + "Extra R$: " + parseFloat(val_df).toFixed(2) 
        + "\n"
        + "DSR   R$: " + parseFloat(val_DSR_DF).toFixed(2)
        + "\n\n"
        + "** FIM DE SEMANA/FERIADOS - NOTURNA **\n"
        + "Extra R$: " + parseFloat(val_df_n).toFixed(2) 
        + "\n"
        + "DSR   R$: " + parseFloat(val_DSR_DF_N).toFixed(2)
        + "\n\n"
        + "Total R$: " + parseFloat(valfinal+valfinal_n+varfinal_df+varfinal_df_n).toFixed(2) );
        + "\n\n"
         return parseFloat(valfinal+valfinal_n+varfinal_df+varfinal_df_n).toFixed(2);
}


function calcHoraMinuto(horaMinuto){
/*Recebe uma variable com as horas 00:00, Separa e calcula os mintus, 60 min = 100 */
    var res = horaMinuto.split(".",2);

    var hora = (res[0])?res[0]:0;
    var min =  (res[1])?res[1]:0;

    console.log("HORA: " + hora);
    console.log("MINUTO: " + min);

    var val  = (min/60)*100;

    var roundVal  = Math.ceil(val * 1); //Faz o round Ex.: 71.66 = 72    

    console.log("HORA MINUTO:" + hora + ":" + roundVal);
    var num  = hora + "."  + roundVal

   return parseFloat(num);


};

function calcDias(uYear,uMonth,uFeriados){

    var startDate = moment(uYear + '-' + uMonth + '-' + 01 + ' 00:00:00', "YYYY-MM-DD HH:mm");
    var endDate = startDate.clone().endOf('month');

    //feriados
    var jan_1   = moment("2016-01-01 0:00", "YYYY-MM-DD HH:mm"); //Ano Novo; 
    var jan_25  = moment("2016-01-25 0:00", "YYYY-MM-DD HH:mm"); //Aniversário de SP
    var mai_1   = moment("2016-05-01 0:00", "YYYY-MM-DD HH:mm"); //Dia do trabalho
    var mai_26  = moment("2016-05-26 0:00", "YYYY-MM-DD HH:mm"); //Corpus Christi; 
    
    
    var abr_14  = moment("2017/04/14 0:00", "YYYY-MM-DD HH:mm"); //Sexta-feira da Paixão 
    var abr_16  = moment("2017/04/16 0:00", "YYYY-MM-DD HH:mm"); //Páscoa
    var abr_21  = moment("2017/04/21 0:00", "YYYY-MM-DD HH:mm"); //Tiradentes

    //Verfica se as datas são válidas
    if (!startDate.isValid()){
        alert("Data Inicío inválida");
        return;
    }else if (!endDate.isValid()){
        alert("Data Final inválida");
        return;
    }else{
        console.log("As datas informadas estão OK");
    };
    
    //DESCANSO SÁBADO -PARA BANCARIOS É TRUE
    console.log('DESCANSO SÁBADO: ' + ( (uDencaso_sat)?'true':'false' ));

    var diasTrabalho = moment().weekdayCalc({  
        rangeStart: startDate,
        rangeEnd: endDate,  
        weekdays: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', (!uDencaso_sat)?'SAT' : '' ], 
        exclusions: [jan_1, mai_1, mai_26, jan_25, abr_14, abr_16, abr_21],
        //inclusions: []
    })


    //Remove os dias de feriado
    diasTrabalho = (diasTrabalho - uFeriados);

    var lastDay = endDate.date(); //get an integer which represents the last day from a given date;
    var diasDescanso = (lastDay - diasTrabalho)

    return dias = [diasTrabalho, diasDescanso];
}