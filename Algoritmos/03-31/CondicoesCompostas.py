#Entrada de dados
nota1 = float(input("Nota 1 :"))
nota2 = float(input("Nota 2 :"))
nota3 = float(input("Nota 3 :"))

aulas = int(input("Quantidade de aulas totais : "))
faltas = int(input("Quantidade de faltas : "))

#Processos
media = (nota1 + nota2 + nota3)/3


percentagemfaltas = (faltas/aulas)*100
percentagemFrequencia = 100 - percentagemfaltas
print(percentagemFrequencia)
#saidas
if media >= 7.0 and percentagemFrequencia >= 75:
    print("Aprovado com média : {:.3} e Frequencia : {}%".format(media,percentagemFrequencia))
elif media >= 7.0 and media <= 3.0 and percentagemFrequencia >= 75:
    print("Recuperação com media : {}".format(media))
else:
    print("Reprovado otário ☻")