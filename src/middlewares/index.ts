import { BadRequestException } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";

export function Validation(req: Request, res: Response, next: NextFunction) {
    const { username, email, password } = req.body
    if (!username) throw new BadRequestException('incorrect username')
    if (!email) throw new BadRequestException('incorrect email')
    if (!password) throw new BadRequestException('incorrect password')

    next()
}

export function ValidationOrder(req: Request, res: Response, next: NextFunction) {
    const { itemName } = req.body
    if (!itemName) throw new BadRequestException('incorrect itemName')

    next()
}

export function CheckAytorization(req: Request, res: Response, next: NextFunction) {
    const { Authorization } = req.headers
    if (!Authorization) throw new BadRequestException('incorrect Authorization')
    next()
}