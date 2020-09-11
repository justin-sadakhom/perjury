function gamePrompt(question, toOutput) {

    const readline = require('readline');
    const prompt = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    })

    prompt.question(question + '\n', function(answer) {
        toOutput = answer
        prompt.close()
    })

    prompt.on('close', function() {
        console.log(toOutput)
        process.exit(0)
    })
}

export { gamePrompt }