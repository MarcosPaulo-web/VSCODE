#Escreva um programa, dada duas datas, determine qual delas ocorreu cronológicamente primeiro.Cada data é composta por 3 numeros inteiros, um
#representando o dia, outro o mês e o outro o ano

data1 = []
data2 = []
print('')
print('Data 1 :')               #Na lista
data1.append(int(input('Dia :')))#0
data1.append(int(input('Mês :')))#1
data1.append(int(input('Ano :')))#2
print('')

print('Data 2 :')
data2.append(int(input('Dia :')))#0
data2.append(int(input('Mês :')))#1
data2.append(int(input('Ano :')))#2
print('')


#verifica as datas em sequencia, o que acontecer primeiro já avisa
#ano
if data1[2] < data2[2]:
    print('Data 1 Aconteceu primeiro por causa do ano')
elif data1[2] > data2[2]:
    print('Data 2 Aconteceu primeiro por causa do ano')
#mês
elif data1[1] < data2[1]:
    print('Data 1 Aconteceu primeiro por causa do mês')

elif data1[1] > data2[1]:
    print('Data 2 Aconteceu primeiro por causa do mês')
#dia
elif data1[0] < data2[0]:
    print('Data 1 Aconteceu primeiro por causa do dia')
elif data1[0] > data2[0]:
    print('Data 2 Aconteceu primeiro por causa do dia')
else:
    print('Datas iguais')
