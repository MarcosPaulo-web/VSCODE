'''
Faça um progra,a que pergunte ao usuario quantos produtos ele deseja comprar.
Para cada produto pergunte o valor unitário e a quantidade desejada.
Ao final da compra mostre o total da compra

v2 : Pergunte se deseja add mais itens (s) ou (n)
'''

#V1

qtdProds = int(input('Quantos produtos pretende comprar :'))
valorFinal = 0
for i in range(qtdProds):
    valor = float(input('\nQual o valor do produto :'))
    qtd = int(input('Quantidade desejada :'))
    valorFinal += valor * qtd
print('\n---------------------------')
print("\n\nValor final : ", valorFinal)