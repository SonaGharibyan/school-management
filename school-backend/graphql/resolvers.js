const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

module.exports = {
  Query: {
    teachers: async (_, __, { prisma, user }) => {
      if (user.role !== "ADMIN") throw new Error("Not authorized");

      return prisma.teacher.findMany();
    },
    pupils: async (_, __, { prisma }) => prisma.pupil.findMany(),
    subjects: async (_, __, { prisma }) => prisma.subject.findMany(),
  },
  Mutation: {
    async signup(_, { password, email, role }, { prisma }) {
      const hashedPassword = await bcrypt.hash(password, 10);

      const user = await prisma.user.create({
        data: {
          email,
          password: hashedPassword,
          role,
        },
      });

      const token = jwt.sign(
        { userId: user.id, role: user.role },
        process.env.JWT_SECRET
      );

      return token;
    },
    login: async (_, { email, password }, { prisma }) => {
      const user = await prisma.user.findUnique({ where: { email } });
      if (!user) throw new Error("User not found");

      const valid = await bcrypt.compare(password, user.password);
      if (!valid) throw new Error("Invalid password");

      const token = jwt.sign(
        { userId: user.id, role: user.role },
        process.env.JWT_SECRET
      );

      return token;
    },
    addTeacher: async (_, { data }, { prisma }) => {
      const { name, subjectIds } = data;

      if (!subjectIds || subjectIds.length === 0) {
        throw new Error(
          "At least one subject must be assigned to the teacher."
        );
      }

      const newTeacher = await prisma.teacher.create({
        data: {
          name,
        },
      });

      await prisma.subject.updateMany({
        where: {
          id: { in: subjectIds.map((id) => parseInt(id)) },
        },
        data: {
          teacherId: newTeacher.id,
        },
      });

      return await prisma.teacher.findUnique({
        where: { id: newTeacher.id },
        include: { subjects: true },
      });
    },

    addPupil: async (_, { name, grade }, { prisma, user }) => {
      // if (user.role !== "ADMIN") throw new Error("Not authorized");
      return prisma.pupil.create({ data: { name, grade } });
    },
    assignSubjectToPupil: async (
      _,
      { pupilId, subjectId },
      { prisma, user }
    ) => {
      if (user.role !== "ADMIN") throw new Error("Not authorized");

      return prisma.pupil.update({
        where: { id: pupilId },
        data: { subjects: { connect: { id: subjectId } } },
      });
    },
    updateTeacher: async (_, { id, data }, { prisma }) => {
      const { name, subjectIds } = data;

      if (!subjectIds || subjectIds.length === 0) {
        throw new Error(
          "At least one subject must be assigned to the teacher."
        );
      }

      const updatedTeacher = await prisma.teacher.update({
        where: { id: Number(id) },
        data: {
          name,
        },
      });

      await prisma.subject.updateMany({
        where: {
          id: { in: subjectIds.map((id) => parseInt(id)) },
        },
        data: {
          teacherId: updatedTeacher.id,
        },
      });

      return await prisma.teacher.findUnique({
        where: { id: updatedTeacher.id },
        include: { subjects: true },
      });
    },

    updatePupil: async (_, { id, data }, { prisma }) => {
      const pupil = await prisma.pupil.update({
        where: { id: Number(id) },
        data: {
          name: data.name,
          grade: data.grade,
        },
      });
      return pupil;
    },
    addPupil: async (_, { data }, { prisma }) => {
      const { name, grade } = data;

      return await prisma.pupil.create({
        data: {
          name,
          grade,
        },
      });
    },

    addSubject: async (_, { data }, { prisma }) => {
      const { name, grade, teacherId } = data;

      return await prisma.subject.create({
        data: {
          name,
          grade,
          teacher: {
            connect: { id: Number(teacherId) },
          },
        },
      });
    },

    updateSubject: async (_, { id, data }, { prisma }) => {
      const subject = await prisma.subject.update({
        where: { id: Number(id) },
        data: {
          name: data.name,
          grade: data.grade,
          teacher: {
            connect: { id: Number(data.teacherId) },
          },
        },
      });
      return subject;
    },

    deleteTeacher: async (_, { id }, { prisma }) => {
      const teacher = await prisma.teacher.delete({
        where: { id: Number(id) },
      });
      return teacher;
    },

    deletePupil: async (_, { id }, { prisma }) => {
      const pupil = await prisma.pupil.delete({
        where: { id: Number(id) },
      });
      return pupil;
    },

    deleteSubject: async (_, { id }, { prisma }) => {
      const subject = await prisma.subject.delete({
        where: { id: Number(id) },
      });
      return subject;
    },
  },
};
