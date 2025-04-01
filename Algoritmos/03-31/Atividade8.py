#Fazer um programa que leia um valor numérico inteiro, o qual representa um
#determinado dia da semana:
#(1 – domingo, 2 – segunda-feira,..., 7 – sábado).
#Baseado neste valor, apresentar por extenso, qual é o nome correspondente a
#esse dia.
#Caso o valor informado não represente nenhum dos dias da semana, apresentar
#a mensagem: “valor inválido”

dia = int(input("digite o dia de semana :"))

if dia == 1:
    print("Domingo")
elif dia == 2:
    print("Segunda")
elif dia == 3:
    print("Terça")
elif dia == 4:
    print("Quarta")
elif dia == 5:
    print("Quita")
elif dia == 6:
    print("Sexta")
elif dia == 7:
    print("Sábado")
else:
    print("Valor inválido")