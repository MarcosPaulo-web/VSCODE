#Escreva um programa que, dado o comprimento de três segmentos de reta,
#determine se eles podem formar um triângulo e, em caso positivo, (caso a soma de 2 lados for maior q 1)
# imprime se o triângulo é equilátero, isósceles ou escaleno. 

#Equilátero: Todos os três lados são iguais.

#Isósceles: Dois lados são iguais.

#Escaleno: Todos os lados são diferentes.

x = float(input('Valor da reta1 :'))
y = float(input('Valor da reta2 :'))
z = float(input('Valor da reta3 :'))
#A função tem que ser escalada antes por ser o tipo que le na ordem o python
def tipoTriangulo(x,y,z):
    if x == y == z:
     print('É um triâmgulo Equilátero')
    elif x == y or x == z or y == z:
       print('É um triângulo Isósceles')
    elif x != y and x != z and z!=y:
       print('É um triângulo Escaloeno')

if x+y>z or z+y>x or z+x>y:
    print('As retas formaram um triângulo')
    tipoTriangulo(x,y,z)
else:
    print('Elas não formam um triângulo')
