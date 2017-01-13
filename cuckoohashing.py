import random


class CuckooHashing:
    def __init__(self, m, n):
        self.m = m
        self.n = n
        self.t1 = [0] * self.m
        self.t2 = [0] * self.n
        self.data = []
        self.p_1, self.p_2 = random.randint(self.m, 2 * self.m), random.randint(self.n, 2 * self.n)
        self.a_1, self.a_2 = random.randint(1, self.p_1), random.randint(1, self.p_2)
        self.b_1, self.b_2 = random.randint(0, self.p_1), random.randint(0, self.p_2)

    def h1(self, value):
        return ((self.a_1 * value + self.b_1) % self.p_1) % self.m

    def h2(self, value):
        return ((self.a_2 * value + self.b_2) % self.p_2) % self.n

    def rehash(self):
        print "Rehashing"
        self.t1 = [0] * self.m
        self.t2 = [0] * self.n
        self.p_1, self.p_2 = random.randint(self.m, 2 * self.m), random.randint(self.n, 2 * self.n)
        self.a_1, self.a_2 = random.randint(1, self.p_1), random.randint(1, self.p_2)
        self.b_1, self.b_2 = random.randint(0, self.p_1), random.randint(0, self.p_2)
        for d in self.data:
            self.add(d)

    def add(self, value):
        for i in range(20):
            if self.t1[self.h1(value)] == 0:
                self.t1[self.h1(value)] = value
                if value not in self.data:
                    self.data.append(value)
                return self.t1, self.t2
            else:
                prev = self.t1[self.h1(value)]
                self.t1[self.h1(value)] = value
                value = prev
            if self.t2[self.h2(value)] == 0:
                self.t2[self.h2(value)] = value
                if value not in self.data:
                    self.data.append(value)
                return self.t1, self.t2
            else:
                prev = self.t2[self.h2(value)]
                self.t2[self.h2(value)] = value
                value = prev
        self.rehash()
        self.add(value)

    def find(self, value):
        x1 = self.h1(value)
        x2 = self.h2(value)
        if self.t1[x1] == value:
            return [1, x1]
        elif self.t2[x2] == value:
            return [2, x2]
        else:
            return False
