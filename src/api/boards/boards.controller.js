const Account = require('models/account');
const Board = require('models/board');
const List = require('models/list');
const Card = require('models/card');
const BoardImage = require('models/boardImage');

exports.getBoards = async (ctx) => {
    const { value } = ctx.params;
    let account = null;

    try {
        account = await Account.findByEmail(value);
    } catch(e) {
        ctx.throw(500, e);
    }

    let boards = null;
    if(account) {
        try {
            boards = await Board.findByAccountId(account.id);
        } catch (e) {
            ctx.throw(500, e);
        }
    }

    ctx.body = boards || [];
};

exports.getLists = async (ctx) => {
    // value(Board ID)
    const { value } = ctx.params;

    // 해당 보드에 해당하는 TDL 목록 가져오기
    let lists = null;
    try {
        lists = await List.findByBoardId(value);
    } catch (e) {
        ctx.throw(500, e);
    }

    const mappedLists = {}; 
    const response = [];
    const listIds = lists.map((list) => {
        const listObject = {
            _id: list.id,
            title: list.title,
            order: list.order,
            cards: []
        };

        mappedLists[list.id] = listObject;
        response.push(listObject);

        return list._id;
    });

    // TDL 목록 하부의 모든 카드 목록 가져오기
    let cards = null;
    try {
        cards = await Card.findByListsIds(listIds);
    } catch (e) {
        ctx.throw(500, e);
    }

    // 위에서 획득한 2개의 목록을 merge 해서 보내준다.
    for (let index = 0; index < cards.length; index++) {
        mappedLists[cards[index].list_id].cards.push(cards[index]);
    }

    ctx.body = {
        boardId: value,
        list: response
    };
};

exports.getBoardImages = async (ctx) => {
    let boardImages = null;
    try {
        boardImages = await BoardImage.getBoardImages();
    } catch (e) {
        ctx.throw(500, e);
    }

    const backgroundColors = [{
        backgroundColor: 'rgb(0, 121, 191)'
    }, {
        backgroundColor: 'rgb(210, 144, 52)'
    }, {
        backgroundColor: 'rgb(81, 152, 57)'
    }, {
        backgroundColor: 'rgb(176, 70, 50)'
    }, {
        backgroundColor: 'rgb(137, 96, 158)'
    }, {
        backgroundColor: 'rgb(205, 90, 145)'
    }];

    ctx.body = boardImages.concat(backgroundColors) || [];
};

exports.createBoard = async (ctx) => {
    const { email, title, thumbnail } = ctx.request.body;
    let account = null;

    try {
        account = await Account.findByEmail(email);
    } catch(e) {
        ctx.throw(500, e);
    }

    let newBoard = null;
    try {
        newBoard = await Board.createBoard({
            account_id: account.id,
            title,
            thumbnail,
            favorite: false
        });
    } catch (e) {
        ctx.throw(500, e);
    }

    ctx.body = newBoard;
};

exports.updateBoard = async (ctx) => {
    let updatedBoard = null;
    try {
        updatedBoard = await Board.updateBoard(ctx.request.body);
    } catch (e) {
        ctx.throw(500, e);
    }

    ctx.body = updatedBoard;
};