'''nome: str  # criando uma variavel 
idade: int # criando uma variavel inteira
salario: float # criando uma variavel de numero real
trabalhaAtualmente: bool # criando uma variavel booleana'''

# inserindo valores
nomePai = 'Jõao da Silva'
nomeFilho = 'Jõao da silva Júnior'
idade = 20
salario = 1423.55
trabalhaAtualmente = False
pcAumento = 10

print('salario com aumento : ',round(salario + salario * pcAumento/100,2))
print('aumento : ',round(salario * pcAumento/100,2))
print('Idade < salario ?',idade<salario)
print('Nome do filho == nome do pai ? ',nomeFilho == nomePai)