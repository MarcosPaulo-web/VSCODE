# 2-Escrva um programa que lê 3 numeros inteiros e os mostre em ordem crescente
nums = []
nums.append(int(input("Num 1 :")))
nums.append(int(input("Num 2 :")))
nums.append(int(input("Num 3 :")))

for a in range(2):
    for i in range(2):
        if nums[i] > nums[i+1]:
            temp = nums[i+1]     
            nums[i+1] = nums[i]
            nums[1] = temp

print(nums)