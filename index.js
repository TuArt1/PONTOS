const path = require('path');
const puppeteer = require('puppeteer');

// Verifica se é win
const isPkg = typeof process.pkg !== 'undefined';

console.log(process.platform)
if (process.platform == 'win32') {
    var chromiumExecutablePath = (isPkg ?
      puppeteer.executablePath().replace(
        /^.*?\\node_modules\\puppeteer\\\.local-chromium/,
        path.join(path.dirname(process.execPath), 'chromium')
      ) :
      puppeteer.executablePath()
    );
  }
  
console.log('relogio 2');
// BOT LOGIN
async function robo(){
  
    // Acessando a pagina
    const browser = await puppeteer.launch({
        executablePath: chromiumExecutablePath,
        headless: true
      });
    //const browser = await puppeteer.launch({headless:false}); //false ou true mostrando oq aconte com o navegardor aberto
    const page = await browser.newPage();
    await page.goto('http:/192.168.3.43');
    
    //Fazendo login
    
    await page.type('[name="lblLogin"]','....');
    await page.type('[name="lblPass"]','.....');
    await page.click('#dvREP > table > tbody > tr:nth-child(2) > td > div > div > a');
    //await page.click('#tbLogin > tbody > tr > td > a');
    
    //Esperndo pagina carregar

    await page.waitForSelector('#tableDefault > tbody > tr:nth-child(1) > td > table > tbody > tr > td > div > a',{visible:true});
    
    // Entrandos em enventos 
    await page.click('#divMenuEvents > div');

    //Esperndo pagina carregar
    
    await page.waitForSelector('#tableDefault > tbody > tr:nth-child(1) > td > table > tbody > tr > td > div > a',{visible:true});
    
    //Filtro date e hora
    
    await page.click('#menuItem2');

    //pegando a DATA
   
    function adicionaZero(numero){ //função para adicionar um 0 ao dia ou mes expl: depois 01/02/2022 antes 1/2/2022
        if (numero <= 9) 
            return "0" + numero;
        else
            return numero; 
    }
    let dataAtual2 = new Date(); 
    let dataAtualFormatada2 = (adicionaZero(dataAtual2.getDate().toString()) + "/" + (adicionaZero(dataAtual2.getMonth()+1).toString()) + "/" + dataAtual2.getFullYear().toString().substr(-2));
    console.log(dataAtualFormatada2);
    //Inserindo data

    await page.focus('#lblDataI');
    await page.keyboard.down('Control');
    await page.keyboard.press('A');
    await page.keyboard.up('Control');
    await page.keyboard.press('Backspace');
    await page.keyboard.type(`${dataAtualFormatada2} 0400` );

    await page.focus('#lblDataF');
    await page.keyboard.down('Control');
    await page.keyboard.press('A');
    await page.keyboard.up('Control');
    await page.keyboard.press('Backspace');
    await page.keyboard.type(`${dataAtualFormatada2} 2200` );
     
    
    //Baixando os arquivos

    
    await page.click('#communication > table > tbody > tr:nth-child(5) > td:nth-child(1) > a');
    await page.waitForSelector('#tableDefault > tbody > tr:nth-child(1) > td > table > tbody > tr > td > div > a',{visible:true});
    await  page.click('#frmREP > table > tbody > tr > td > div > table > tbody > tr:nth-child(2) > td > a');
    await page.waitForTimeout(2000);    
    await browser.close();
    
}



robo();
