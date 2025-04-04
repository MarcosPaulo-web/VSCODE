listaNum = []
stop = False
quantNum = int(input("Quantidade de numeros : "))

for a in range(quantNum):
    listaNum.append(int(input("Digite um numero :")))
print(sorted(listaNum))