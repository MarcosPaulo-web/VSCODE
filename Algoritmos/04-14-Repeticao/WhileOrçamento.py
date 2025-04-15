orcamento = float(input('Qual valor vc tem para gastar : '))

while orcamento > 0:
    vl = float(input('Qual valor de sua compra ? :'))
    orcamento -= vl
    print('Resta R$: ',orcamento)

print('Acabou a mamata')