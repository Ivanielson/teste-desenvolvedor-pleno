const chai = require('chai');
const sinon = require('sinon');
const chaiHttp = require('chai-http');
const app = require('../src/api/app');
const { Questions } = require('../src/models');
const question = require('./mock/questions');

chai.use(chaiHttp);
const { expect } = chai;

describe("Rota 'POST /questions'", () => {
  before(async () => {
    sinon
      .stub(Questions, 'create')
      .callsFake(question.create);
  });

  after(() => {
    Questions.create.restore();
  });

  describe("Quando a pergunta é criada com sucesso", () => {
    let response;

    const payload = {
      question: 'Quais são as fases da Lua?'
    };

    before(async () => {
      response = await chai
        .request(app)
        .post('/questions')
        .send(payload);
    });

    it("Deveria retorna http status 201", async () => {
      expect(response).to.have.status(201);
    });

    it('Deveria retornar um objeto', () => {
      expect(response.body).to.be.have.a('object');
    });

    it("Deveria retornar um objeto com as propriedades 'id' e 'question'", () => {
      expect(response.body).to.be.have.a.property('id');
      expect(response.body).to.be.have.a.property('question');
    });
  });
});

describe("Rota 'GET /questions'", () => {
  before(async () => {
    sinon
      .stub(Questions, 'findAll')
      .callsFake(question.getAll);
  });

  after(() => {
    Questions.findAll.restore();
  });

  describe("Quando a requisição é feita com sucesso", () => {
    let response;

    before(async () => {
      response = await chai
        .request(app)
        .get('/questions');
    });

    it("Deveria retorna http status 200", async () => {
      expect(response).to.have.status(200);
    });

    it('Deveria retornar um array', () => {
      expect(response.body).to.be.have.a('array');
    });

    it('Deveria retornar um array de objetos com as perguntas cadastradas', () => {
      expect(response.body).to.be.length(4);
    });

    it("Deveria retornar um array de objetos com as propriedades 'id' e 'question'", () => {
      expect(response.body[0]).to.be.have.a.property('id');
      expect(response.body[0]).to.be.have.a.property('question');
    });
  });
});

describe("Rota 'GET /questions/:id'", () => {
  before(async () => {
    sinon
      .stub(Questions, 'findByPk')
      .callsFake(question.getById);
  });

  after(() => {
    Questions.findByPk.restore();
  });

  describe("Quando a requisição é feita com sucesso", () => {
    let response;

    before(async () => {
      response = await chai
        .request(app)
        .get('/questions/2');
    });

    it("Deveria retorna http status 200", async () => {
      expect(response).to.have.status(200);
    });

    it("Deveria retornar um objeto", () => {
      expect(response.body).to.be.have.a('object');
    });

    it("Deveria retornar um objeto com as propriedades 'id' e 'question'", () => {
      expect(response.body).to.be.have.a.property('id');
      expect(response.body).to.be.have.a.property('question');
    });

    it('Deveria retornar um objeto com a pergunta correta', () => {
      expect(response.body.id).to.be.equal(2);
      expect(response.body.question).to.be.equal('Qual a montanha mais alta do mundo?');
    });
  });
});
