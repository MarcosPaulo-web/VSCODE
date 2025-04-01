

nome = (input('nome do aluno :'))
num1 = float(input('Nota 1:'))
num2 = float(input('nota 2 :'))
num3 = float(input('nota 3 :'))
media = num1 + num2 + num3
print('média das 3 provas =',round(media/3))

for _ in range(1):
 print('')

print("O Aluno "+nome+" foi ")

if media >= 6 : print("Aprovado") 
else: print("Reprovado")
