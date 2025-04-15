qtdProds = int(input('Quantos produtos pretende comprar :'))
valorFinal = 0
while qtdProds >= 0 :
     if qtdProds == 0:
        op = input('\nDeseja add mais produto(s ou n) :')
        if op.lower() == 's':
               qtdProds += int(input('\nQuantos pretende adicionar :'))
        elif op.lower() == 'n':
             print('\nPrograma encerrado')
             break
     valor = float(input('\nQual o valor do produto :'))
     qtd = int(input('Quantidade desejada :'))
     qtdProds = qtdProds- 1
     valorFinal += valor * qtd
print('\n---------------------------')
print("\n\nValor final : ", valorFinal)