'''nome: Marcos
sexo: masculino
peso = 90
altura = 1.90'''

nome = input('Nome :')
sexo = input('Sexo (m/f) :')
peso = float(input('Peso :'))
altura = float(input('altura : '))

imc = peso/pow(altura,2)

print('Valor do IMC :',round(imc,2))
