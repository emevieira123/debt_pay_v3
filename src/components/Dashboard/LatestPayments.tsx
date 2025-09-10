import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { formatCurrency } from "@/utils/formatCurrency";
import { formatDate } from "@/utils/formatDate";
import { useGetRecentsPayments } from "@/hooks/useGetRecentsPayments";
import { Loader2 } from "lucide-react";
import { TooltipCustom } from "../TooltipCustom";

export function LatestPayments() {
  const { data: recentPayments, isLoading } = useGetRecentsPayments();

  return (
    <Card className="bg-zinc-900 border-zinc-700">
      <CardHeader>
        <CardTitle className="text-white">Últimos pagamentos</CardTitle>
      </CardHeader>
      <CardContent className="h-[56vh] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-transparent">
        {
          isLoading ? (
            <div className="flex w-full h-full items-center justify-center">
              <Loader2 className="mr-2 h-6 w-6 animate-spin" />
              Carregando informações...
            </div>
          ) : (
            <div className="space-y-3">
              {recentPayments?.map((payment) => {
                return (
                  <div key={payment.parcelaId} className="grid grid-cols-2 md:grid-cols-[1fr_1fr_0.8fr_0.5fr] gap-4 items-center p-3 bg-zinc-800 rounded-lg">
                    {/* Mobile: Primeira coluna - Credor e Produto */}
                    <div className="md:hidden">
                      <div className="mb-2">
                        <p className="text-sm text-zinc-400">Credor</p>
                        {
                          payment?.nomeCobrador?.length > 20
                            ? (
                              <TooltipCustom
                                trigger={payment.nomeCobrador.slice(0, 20) + "..."}
                                content={payment?.nomeCobrador}
                              />
                            ) : (
                              <p className="text-white font-medium">{payment?.nomeCobrador}</p>
                            )
                        }
                      </div>
                      <div>
                        <p className="text-sm text-zinc-400">Produto</p>
                        {
                          payment?.nomeProduto?.length > 20
                            ? (
                              <TooltipCustom
                                trigger={payment?.nomeProduto?.slice(0, 20) + '...'}
                                content={payment?.nomeProduto}
                              />
                            ) : (
                              <p className="text-white font-medium">{payment?.nomeProduto}</p>
                            )
                        }
                      </div>
                    </div>

                    {/* Mobile: Segunda coluna - Valor pago e Data */}
                    <div className="md:hidden flex flex-col items-end">
                      <div className="mb-2">
                        <p className="text-sm text-zinc-400">Valor pago</p>
                        <p className="text-green-500 font-medium">
                          {formatCurrency(payment?.valorParcela)}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-zinc-400">Pago em</p>
                        <p className="text-white font-medium">{formatDate(payment?.dataPagamento)}</p>
                      </div>
                    </div>

                    {/* Desktop: Layout original */}
                    <div className="hidden md:block">
                      <p className="text-sm text-zinc-400">Credor</p>
                      {
                        payment?.nomeCobrador?.length > 16
                          ? (
                            <TooltipCustom
                              trigger={payment.nomeCobrador.slice(0, 16) + "..."}
                              content={payment?.nomeCobrador}
                            />
                          ) : (
                            <p className="text-white font-medium">{payment?.nomeCobrador}</p>
                          )
                      }
                    </div>
                    <div className="hidden md:block">
                      <p className="text-sm text-zinc-400">Produto</p>
                      {
                        payment?.nomeProduto?.length > 16
                          ? (
                            <TooltipCustom
                              trigger={payment?.nomeProduto?.slice(0, 16) + '...'}
                              content={payment?.nomeProduto}
                            />
                          ) : (
                            <p className="text-white font-medium">{payment?.nomeProduto}</p>
                          )
                      }
                    </div>
                    <div className="hidden md:block">
                      <p className="text-sm text-zinc-400">Pago em</p>
                      <p className="text-white font-medium">{formatDate(payment?.dataPagamento)}</p>
                    </div>
                    <div className="hidden md:flex flex-col items-end">
                      <p className="text-sm text-zinc-400">Valor pago</p>
                      <p className="text-green-500 font-medium">
                        {formatCurrency(payment?.valorParcela)}
                      </p>
                    </div>
                  </div>
                )
              })}
            </div>
          )
        }
      </CardContent>
    </Card>
  );
}