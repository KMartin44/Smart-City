import { MainLayout } from "@/layouts/mainLayout";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import {
    TriangleAlert,
    CalendarDays,
    ClipboardList,
    MapPinned
} from "lucide-react";

export default function MainPage() {
    return (
        <MainLayout>
            <div className="space-y-8">

                <div className="text-center space-y-4">
                    <h1 className="text-3xl font-bold">
                        Digitális Faliújság
                    </h1>
                    <p className="text-muted-foreground max-w-2xl mx-auto">
                        Egy modern városi platform, ahol eseményeket hozhatsz létre,
                        problémákat jelenthetsz be, és követheted az önkormányzat
                        hivatalos közleményeit.
                    </p>
                </div>

                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">

                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <CalendarDays className="w-5 h-5" />
                                Események
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <p className="text-sm text-muted-foreground">
                                Hozz létre vagy böngéssz eseményeket a városban.
                            </p>
                            <Button className="w-full" onClick={() => window.location.href = "/events"}>
                                Események megnyitása
                            </Button>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <TriangleAlert className="w-5 h-5" />
                                Problémák
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <p className="text-sm text-muted-foreground">
                                Jelents be közterületi vagy egyéb problémákat.
                            </p>
                            <Button className="w-full" onClick={() => window.location.href = "/issues"}>
                                Bejelentés indítása
                            </Button>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <ClipboardList className="w-5 h-5" />
                                Közlemények
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <p className="text-sm text-muted-foreground">
                                Kövesd az önkormányzat hivatalos bejelentéseit.
                            </p>
                            <Button className="w-full" onClick={() => window.location.href = "/statements"}>
                                Közlemények megtekintése
                            </Button>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <MapPinned className="w-5 h-5" />
                                Térkép
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <p className="text-sm text-muted-foreground">
                                Nézd meg az eseményeket és bejelentéseket térképen.
                            </p>
                            <Button className="w-full" onClick={() => window.location.href = "/map"}>
                                Térkép megnyitása
                            </Button>
                        </CardContent>
                    </Card>

                </div>
            </div>
        </MainLayout>
    );
}