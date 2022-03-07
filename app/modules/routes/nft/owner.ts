import { FastifyReply, FastifyRequest } from "fastify";
import { NFTOwnerController } from "../../controller/NFTOwnerController";
import { IPerson } from "../../interfaces/IPerson";
import { IUser } from "../../interfaces/IUser";
import { IWallet } from "../../interfaces/IWallet";
import { parseQueryUrl } from "../../util/parse-query-url";
import { respond } from "../../util/respond";
/**
 * 
 * @param {*} req
 * @param {*} res
 */
export const createOwner = async (req: FastifyRequest, res: FastifyReply) => {
    const owner:IPerson = req.body as any;
    const ctl = new NFTOwnerController(owner);
    const user = req['session'] as any;
    try {
        owner.wallet = user.walletId;
        const hasOwner = (await ctl.findPerson(user.walletId) as IUser);
        if (hasOwner.success===false) {
            const result = await ctl.create();
            res.code(200).send(result);
        } else {
            return respond("Current Owner has been created already", true, 501);
        }
    } catch (error) {
        res.code(400).send(error);
    }
};
export const updateOwner = async (req: FastifyRequest, res: FastifyReply) => {
    const Owner=req.body as any;
    const ctl = new NFTOwnerController();
    const user = req['session'].walletId as any;
    try {
        const hasOwner = (await ctl.findPerson(user) as IUser);
        console.log(hasOwner)
        if (hasOwner.success===false) {
            res.code(400).send(hasOwner);
        }else{
            console.log(hasOwner)
            const result = await ctl.updateOwner(user,{...Owner});
            res.send(result);
        }
    } catch (error) {
        res.code(400).send(error);
    }
};
/**
 * 
 * @param {*} req
 * @param {*} res
 */
 export const getAllOwners = async (req: FastifyRequest, res: FastifyReply) => {
    const query = req.url.split("?")[1];
    const filters = parseQueryUrl(query);
    const ctl = new NFTOwnerController();
    const result = await ctl.findAllOwners(filters);
    res.send(result);
  };
  /**
   * @param {*} req
   * @param {*} res
   */
  export const getOwner= async (req: FastifyRequest, res: FastifyReply) => {
    const walletId = req.params['ownerId'] as string;
    const ctl= new NFTOwnerController();
    const result = await ctl.findOwner(walletId)
    res.send(result);
  }
  /**
 * 
 * @param {*} req
 * @param {*} res
 * @param ownerId
 */
 export const getOwnerNtfs = async (req: FastifyRequest, res: FastifyReply) => {
    const walletId = req.params['ownerId'] as string;
    const ctl = new NFTOwnerController();
    const result = await ctl.getOwnerNtfs(walletId);
    res.send(result);
  };

  export const getOwnerHistory = async (req: FastifyRequest, res: FastifyReply) => {
    const walletId = req.params['ownerId'] as string;
    const ctl = new NFTOwnerController();
    const result = await ctl.getOwnerNtfs(walletId);
    res.send(result);
  };

  export const getOwnerCollection = async (req: FastifyRequest, res: FastifyReply) => {
    const walletId = req.params['ownerId'] as string;
    const ctl = new NFTOwnerController();
    const result = await ctl.getOwnerCollection(walletId);
    res.send(result);
  };

  
