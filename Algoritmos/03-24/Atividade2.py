'''
1 pé = 12 polegadas
1 jarda = 3 pés
1 milha = 1760 jardas

Faça um programa que receba uma medida em pés e mostre os resultados:
a) Polegadas
b) Jardas
c) Milhas

'''

#entrada de dados
pes = float(input("coloque uma altura em pés : "))
# processei e sai
print("Em polegadas : "+ str(pes*12))
print("Em jardas : "+ str(pes/3))
print("Em milhas : "+ str((pes/3)/1760))


