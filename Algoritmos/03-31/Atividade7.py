#Fazer um programa para ler o ano e o mês de nascimento (1 a 12) de uma
#pessoa, bem como o mês atual. Caso o mês atual seja igual ao mês de
#nascimento, escrever a mensagem: “mês referente a seu aniversário”, caso
#contrário, escrever a mensagem “não é o mês do seu aniversário”. Calcular e
#mostrar a idade dessa pessoa levando-se em conta apenas mês e ano
from datetime import datetime

mes = int(input('Qual seu Mês de nascimento : '))
ano = int(input('Qual seu Ano de nascimento : '))
print('')
currentDate = datetime.today()

print('Data atual : {}'.format(currentDate.strftime("%d/%m/%y")))
print('')

if mes == currentDate.month:
    print('mês referente a seu aniversário')
else:
    print('não é o mês do seu aniversário')


idade = (currentDate.year - ano)

print("Idade :{} ".format(idade))

