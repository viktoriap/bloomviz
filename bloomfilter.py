from bitarray import bitarray
from fnvhash import fnv1a_32, fnv0_32


class BloomFilter:
    def __init__(self, m, k):
        self.m = m
        self.k = k
        self.array = bitarray(m)
        self.array.setall(0)
        self.positions = {}

    def h(self, value, i):
        return (fnv0_32(value) + i * fnv1a_32(value)) % self.m

    def add(self, value):
        self.positions[value] = []
        for i in range(self.k):
            position = self.h(value, i)
            self.array[position] = 1
            self.positions[value].append(position)
        return self.positions[value]

    def find(self, value):
        for i in range(self.k):
            if self.array[self.h(value, i)] == 0:
                return False
        try:
            return self.positions[value]
        except KeyError:
            return False
