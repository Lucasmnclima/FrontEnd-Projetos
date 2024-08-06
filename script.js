// Função para adicionar caracteres ao display
function appendToDisplay(value) {
    const display = document.getElementById('display');
    // Evita adicionar múltiplos operadores consecutivos
    if (['+', '-', '*', '/'].includes(value) && /[\+\-\*\/]$/.test(display.value)) {
        display.value = display.value.slice(0, -1) + value;
    } else {
        display.value += value;
    }
}

// Função para limpar o display
function clearDisplay() {
    document.getElementById('display').value = '';
}

// Função para calcular o resultado
function calculateResult() {
    const display = document.getElementById('display');
    try {
        // Avalia a expressão matemática no display
        display.value = eval(display.value.replace(/Math.sqrt/g, 'Math.sqrt')
                                         .replace(/Math.pow/g, 'Math.pow')
                                         .replace(/Math.log10/g, 'Math.log10')
                                         .replace(/Math.sin/g, 'Math.sin')
                                         .replace(/Math.cos/g, 'Math.cos')
                                         .replace(/Math.tan/g, 'Math.tan')
                                         .replace(/Math.exp/g, 'Math.exp')
                                         .replace(/Math.PI/g, 'Math.PI'));
    } catch (e) {
        display.value = 'Error';
    }
}
